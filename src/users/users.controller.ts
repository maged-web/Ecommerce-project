import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-role.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@CurrentUser() currentUser: UserEntity)/* : any */ {
    if (!currentUser) {
      //return {message: 'User not authenticated'};
      throw new Error('User not authenticated');
    }
    return currentUser;
  }
  @Post('signup')
  async signup(@Body() UserSignupDto: UserSignupDto): Promise<UserEntity> {
      return await this.usersService.signup(UserSignupDto);
  }
  
  @Post('signin')
  async signin(@Body() UserSigninDto: UserSigninDto): Promise<{accessToken: string, user: UserEntity}> {
    
   const user= await this.usersService.signin(UserSigninDto);
   const accessToken = await this.usersService.accessToken(user);

   return{accessToken,user};
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  //@AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

 

}
