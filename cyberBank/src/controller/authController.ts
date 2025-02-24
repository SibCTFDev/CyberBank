import { Controller, Get, Param } from 'routing-controllers';
import 'reflect-metadata';


@Controller()
export class AuthController {
    @Get('/users/:id')
    getOne(@Param('id') id: number) {
        return 'This action returns user #' + id;
    }
}