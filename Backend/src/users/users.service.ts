import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 1. Register Logic (Hash Password)
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      String(createUserDto.password),
      salt,
    );

    const createdUser = new this.userModel({
      name: String(createUserDto.name),
      email: String(createUserDto.email),
      role:
        createUserDto.role === undefined
          ? undefined
          : String(createUserDto.role),
      password: hashedPassword,
    });
    return createdUser.save();
  }

  // 2. Login Logic (Find User) -> THIS WAS MISSING
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    const update: Partial<CreateUserDto> = {
      ...updateUserDto,
    };

    if (updateUserDto.password !== undefined) {
      const passwordString = String(updateUserDto.password);
      if (passwordString.length === 0) {
        delete update.password;
      } else {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(passwordString, salt);
      }
    }

    return this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async remove(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async seedAdmin() {
    const email = String(process.env.ADMIN_EMAIL || '');
    const password = String(process.env.ADMIN_PASSWORD || '');
    const name = String(process.env.ADMIN_NAME || '');

    if (!email || !password || !name) {
      console.warn('Admin environment variables missing. Skipping admin seeding.');
      return;
    }

    const exists = await this.userModel.findOne({ email });
    if (exists) {
      console.log('Admin user already exists. Skipping seeding.');
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await this.userModel.create({
      name,
      email,
      password: hashed,
      role: 'admin',
    });

    console.log('Admin user created!');
  }

}
