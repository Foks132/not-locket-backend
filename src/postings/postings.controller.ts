import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PostingsService } from "./postings.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("postings")
export class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Request() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: "image/jpeg" })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.postingsService.create(file, req.user.sub);
  }
}
