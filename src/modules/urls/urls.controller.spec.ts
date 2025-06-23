import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { LoggedUser } from '../auth/types/logged-user.type';
import { FindUrlsDto } from './dto/find-urls.dto';
import { UrlNotFound } from './errors/url-errors';
import { UpdateUrlDto } from './dto/update-url.dto';

describe('UrlsController', () => {
  let controller: UrlsController;
  let service: UrlsService;

  const mockUrlsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser: LoggedUser = {
    id: 'user-id',
    username: 'user@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [
        {
          provide: UrlsService,
          useValue: mockUrlsService,
        },
      ],
    }).compile();

    controller = module.get<UrlsController>(UrlsController);
    service = module.get<UrlsService>(UrlsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new url', async () => {
      const createUrlDto: CreateUrlDto = { longUrl: 'http://example.com' };
      const url = {
        id: 'url-id',
        shortUrl: 'http://short.ly/1',
        ...createUrlDto,
      };
      mockUrlsService.create.mockResolvedValue(url);

      const result = await controller.create(createUrlDto);

      expect(result).toEqual(url);
      expect(service.create).toHaveBeenCalledWith(createUrlDto);
    });

    it('should create a new url with user', async () => {
      const createUrlDto: CreateUrlDto = { longUrl: 'http://example.com' };
      const url = {
        id: 'url-id',
        shortUrl: 'http://short.ly/1',
        ...createUrlDto,
      };
      mockUrlsService.create.mockResolvedValue(url);

      const result = await controller.create(createUrlDto, mockUser);

      expect(result).toEqual(url);
      expect(service.create).toHaveBeenCalledWith({
        ...createUrlDto,
        userId: mockUser.id,
      });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of urls', async () => {
      const query = new FindUrlsDto();
      const paginatedUrls = { data: [], page: 1, results: 10, totalResults: 0 };
      mockUrlsService.findAll.mockResolvedValue(paginatedUrls);

      const result = await controller.findAll(query, mockUser);

      expect(result).toEqual(paginatedUrls);
      expect(service.findAll).toHaveBeenCalledWith({
        ...query,
        userId: mockUser.id,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single url', async () => {
      const url = { id: 'url-id', longUrl: 'http://example.com' };
      mockUrlsService.findOne.mockResolvedValue(url);

      const result = await controller.findOne('url-id', mockUser);

      expect(result).toEqual(url);
      expect(service.findOne).toHaveBeenCalledWith('url-id', mockUser.id);
    });

    it('should throw UrlNotFound if url is not found', async () => {
      mockUrlsService.findOne.mockResolvedValue(null);

      await expect(controller.findOne('url-id', mockUser)).rejects.toThrow(
        UrlNotFound,
      );
    });
  });

  describe('update', () => {
    it('should update a url', async () => {
      const updateUrlDto: UpdateUrlDto = { longUrl: 'http://new-example.com' };
      mockUrlsService.update.mockResolvedValue(true);

      await controller.update('url-id', updateUrlDto, mockUser);

      expect(service.update).toHaveBeenCalledWith(
        { id: 'url-id', userId: mockUser.id },
        updateUrlDto,
      );
    });

    it('should throw UrlNotFound if url is not found', async () => {
      mockUrlsService.update.mockResolvedValue(false);
      const updateUrlDto: UpdateUrlDto = { longUrl: 'http://new-example.com' };

      await expect(
        controller.update('url-id', updateUrlDto, mockUser),
      ).rejects.toThrow(UrlNotFound);
    });
  });

  describe('remove', () => {
    it('should remove a url', async () => {
      mockUrlsService.remove.mockResolvedValue(true);

      await controller.remove('url-id', mockUser);

      expect(service.remove).toHaveBeenCalledWith('url-id', mockUser.id);
    });

    it('should throw UrlNotFound if url is not found', async () => {
      mockUrlsService.remove.mockResolvedValue(false);

      await expect(controller.remove('url-id', mockUser)).rejects.toThrow(
        UrlNotFound,
      );
    });
  });
});
