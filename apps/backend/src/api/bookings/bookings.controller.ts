import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import {
  CreateBookingDto,
  CreateBookingLandingDto,
  QueryBooking,
} from './dto/bookings.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard)
  @Get()
  list(@Query(new PaginationPipe()) query: QueryBooking, @Auth() auth: IAuth) {
    return this.bookingsService.list(query, auth);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  detail(@Param('id') id: number) {
    return this.bookingsService.detail(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  booking(@Body() body: CreateBookingDto, @Auth() auth: IAuth) {
    return this.bookingsService.create(body, auth);
  }

  @Post('landing')
  bookingFromLanding(@Body() body: CreateBookingLandingDto) {
    return this.bookingsService.createFromLanding(body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.bookingsService.destroy(id, auth);
  }
}
