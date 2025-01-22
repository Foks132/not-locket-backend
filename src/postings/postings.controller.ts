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
        validators: [
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|gif|webp|bmp|tiff)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log("Uploaded file:", {
      userId: req.user.sub,
      originalName: file.originalname,
      mimeType: file.mimetype,
    });
    return this.postingsService.create(file, req.user.sub);
  }
}
