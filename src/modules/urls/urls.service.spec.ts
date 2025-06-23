import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { ConfigService } from '@nestjs/config';
import { UrlAlreadyExists } from './errors/url-errors';
import { CreateUrlDto } from './dto/create-url.dto';

describe('UrlsService', () => {
  let service: UrlsService;

  const mockUrlRepository = {
    create: jest.fn(),
    save: jest.fn(),
    exists: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string, defaultValue: string | number) => {
      if (key === 'HOST_URL') return 'http://localhost:3000';
      if (key === 'SHORT_URL_LENGTH') return 6;
      return defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: getRepositoryToken(Url),
          useValue: mockUrlRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new url', async () => {
      const createUrlDto: CreateUrlDto = {
        longUrl: 'http://example.com',
        userId: 'user-id',
      };
      const url = {
        id: 'url-id',
        key: 'random',
        ...createUrlDto,
      };

      mockUrlRepository.exists.mockResolvedValue(false);
      mockUrlRepository.create.mockReturnValue(url);
      mockUrlRepository.save.mockResolvedValue(url);

      const result = await service.create(createUrlDto);

      expect(result.longUrl).toBe(createUrlDto.longUrl);
      expect(result.shortUrl).toContain('http://localhost:3000/');
      expect(mockUrlRepository.exists).toHaveBeenCalled();
      expect(mockUrlRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          longUrl: createUrlDto.longUrl,
          userId: createUrlDto.userId,
        }),
      );
      expect(mockUrlRepository.save).toHaveBeenCalledWith(url);
    });

    it('should throw UrlAlreadyExists if key already exists', async () => {
      const createUrlDto: CreateUrlDto = {
        longUrl: 'http://example.com',
        userId: 'user-id',
      };

      mockUrlRepository.exists.mockResolvedValue(true);

      await expect(service.create(createUrlDto)).rejects.toThrow(
        UrlAlreadyExists,
      );
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of urls', async () => {
      const queryDto = {
        toQuery: () => ({ skip: 0, take: 10, where: {} }),
        page: 1,
        results: 10,
      };
      const urls = [
        { id: 'url-id', key: 'random', longUrl: 'http://example.com' },
      ];
      const total = 1;

      mockUrlRepository.findAndCount.mockResolvedValue([urls, total]);

      const result = await service.findAll(queryDto);

      expect(result.data[0].longUrl).toBe(urls[0].longUrl);
      expect(result.page).toBe(queryDto.page);
      expect(result.results).toBe(queryDto.results);
      expect(result.totalResults).toBe(total);
      expect(mockUrlRepository.findAndCount).toHaveBeenCalledWith({
        skip: queryDto.toQuery().skip,
        take: queryDto.toQuery().take,
        where: queryDto.toQuery().where,
        relations: ['user'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single url', async () => {
      const url = {
        id: 'url-id',
        key: 'random',
        longUrl: 'http://example.com',
      };
      mockUrlRepository.findOne.mockResolvedValue(url);

      const result = await service.findOne('url-id', 'user-id');

      expect(result).not.toBeNull();
      expect(result!.longUrl).toBe(url.longUrl);
      expect(mockUrlRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'url-id', userId: 'user-id' },
        relations: ['user'],
      });
    });

    it('should return null if url is not found', async () => {
      mockUrlRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('url-id', 'user-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a url', async () => {
      mockUrlRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(
        { id: 'url-id', userId: 'user-id' },
        { longUrl: 'http://new-example.com' },
      );

      expect(result).toBe(true);
      expect(mockUrlRepository.update).toHaveBeenCalledWith(
        { id: 'url-id', userId: 'user-id' },
        { longUrl: 'http://new-example.com' },
      );
    });

    it('should return false if url is not found', async () => {
      mockUrlRepository.update.mockResolvedValue({ affected: 0 });

      const result = await service.update(
        { id: 'url-id', userId: 'user-id' },
        { longUrl: 'http://new-example.com' },
      );

      expect(result).toBe(false);
    });
  });

  describe('remove', () => {
    it('should soft delete a url', async () => {
      mockUrlRepository.softDelete.mockResolvedValue({ affected: 1 });

      const result = await service.remove('url-id', 'user-id');

      expect(result).toBe(true);
      expect(mockUrlRepository.softDelete).toHaveBeenCalledWith({
        id: 'url-id',
        userId: 'user-id',
      });
    });

    it('should return false if url is not found', async () => {
      mockUrlRepository.softDelete.mockResolvedValue({ affected: 0 });

      const result = await service.remove('url-id', 'user-id');

      expect(result).toBe(false);
    });
  });
});
