import { Controller, Get, Inject, Optional, Param, Res } from '@nestjs/common';
import { GET_USER_ROOMS_HTTP_SRR_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';
// import { Response } from 'express'; // ✅ default without fastify
import { FastifyReply } from 'fastify';

@Controller()
export class GetUserRoomsSSREndPoint {

  constructor(
    @Optional() @Inject('GET_ROOMS_ByUserSSRControllerAdapter') 
    private getRoomsByUserSSRControllerAdapter: IHttpController
  ) { }

  @Get(`${GET_USER_ROOMS_HTTP_SRR_URI}/:userId`)
  async handle(@Param() params: any,@Res() res: FastifyReply) {
    const htmlString= await this.getRoomsByUserSSRControllerAdapter.handle({ userId: +params.userId });
    res.type('text/html').send(htmlString);
  }

}
