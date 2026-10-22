import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { GET_ROOMS_BY_USER_SSR_CONTROLLER, GET_USER_ROOMS_HTTP_SRR_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';
import { FastifyReply } from 'fastify';

@Controller()
export class GetUserRoomsSSREndPoint {

  constructor(
    @Inject(GET_ROOMS_BY_USER_SSR_CONTROLLER)
    private getRoomsByUserSSRController: IHttpController
  ) { }

  @Get(`${GET_USER_ROOMS_HTTP_SRR_URI}/:userId`)
  async handle(@Param('userId') userId: string, @Res() res: FastifyReply) {
    const html = await this.getRoomsByUserSSRController.handle({ userId: +userId });
    res.type('text/html').send(html);
  }

}
