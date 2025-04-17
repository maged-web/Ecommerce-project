import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import { hash ,compare} from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(UserSignupDto: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(UserSignupDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    UserSignupDto.password=await hash(UserSignupDto.password,10);
    let user = this.usersRepository.create(UserSignupDto);
    user = await this.usersRepository.save(user);
    delete user.password;  
      return user;
  }
  async signin(UserSigninDto: UserSigninDto): Promise<UserEntity> {
    const userExists = await this.usersRepository.createQueryBuilder('user').addSelect('user.password')
    .where('user.email=:email', {email:UserSigninDto.email}).getOne();
    if(!userExists){
      throw new BadRequestException('User not found');
    }
    const matchPassword = await compare(UserSigninDto.password,userExists.password);
    if(!matchPassword){
      throw new BadRequestException('Invalid password');
    }
    delete userExists.password;
    return userExists;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user= await this.usersRepository.findOneBy({ id: 1 });;
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email });
  }
  async accessToken(user: UserEntity) : Promise<string>{
    return sign({ id: user.id, email: user.email },process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:'30m'});
  }
}
