import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { ExcelJsService } from 'utils/services/exceljs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { IAuth } from 'utils/interfaces/IAuth';
import { Auth } from 'utils/decorators/auth.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Post('/create/auto')
  async createAuto(@Auth() auth: IAuth) {
    await this.suppliersService.createAuto(auth);
    return 'Product Berhasil di proses, mohon tunggu beberapa saat';
  }

  @Post('/import')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(xlsx)$/)) {
          return callback(
            new BadRequestException('Hanya file .xlsx yang diperbolehkan!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  import(@UploadedFile() file: Express.Multer.File, @Auth() auth: IAuth) {
    this.excelJs.uploadStreamFile({
      lineStart: 2,
      fileBuffer: file.buffer,
      parseRow: (row) => this.suppliersService.createFromImport(row, auth),
    });
    return 'Product Berhasil di proses, mohon tunggu beberapa saat';
  }
}
