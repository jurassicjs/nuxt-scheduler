import {H3Event} from "h3";

export default defineEventHandler((event: H3Event) => {
  console.log('+++++++++++New request: ' + JSON.stringify(event.node.req.headers))

  if (event.path == '/api/schedule') {
    // add protection for route if desired
    // example:

    // return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

})
