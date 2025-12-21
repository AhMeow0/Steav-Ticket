import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Import Mongoose
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity'; // 2. Import the Schema

@Module({
  imports: [
    // 3. Register the Schema so the Service can find it
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 4. EXPORT this so AuthModule can use it
})
export class UsersModule {}
