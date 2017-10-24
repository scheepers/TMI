/**
 * @file RestWrapper.js
 * Restful service wrapper.
 */

"use strict";

const
  bodyParser = require('body-parser'),
  parseQuery = bodyParser.urlencoded({ extended: false }),
  parseBody = bodyParser.json()

class RestWrapper {

  /**
   * Constructs a new RestWrapper
   * @param  object minimi [description]
   * @param  string name      [description]
   * @param  object schema    [description]
   */
  constructor(minimi, name, schema){
    this.minimi = minimi
    this.name = name
    this.schema = schema
    this.config = minimi.config.schema[name]

    this.attachMethods(minimi)
  }

  /**
   * Attach request method responders
   */
  attachMethods(){
    var
      thisObject = this,
      methods = this.methods()

    for (var method in methods){
      if (this[method]){
        (

          (method) => {
            for (var i in methods[method]){
              this.minimi.router[method](
                '/' + thisObject.name,
                methods[method][i]
              )
            }
            this.minimi.router[method](
              '/' + this.name,

              (request, response) => {
                this.minimi.emit(this.name + ' get', request.query)

                let result
                if (result = thisObject[method](request, response)){
                  response.send(result)
                }
              }
            )
          }
        )(method)
      }
    }
  }

  /**
   * Declare methods to respond to and middleware to apply to each
   * @return object middleware mapping keyed by method
   */
  methods(){
    return {
      'get': [parseQuery],
      'post': [parseBody],
      'put': [parseBody],
      'delete': [parseQuery],
      'patch': [parseQuery, parseBody]
    }
  }

  /**
   * Process a GET request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  get(request, response) {
    return JSON.stringify(request.query)
  }

  /**
   * Process a POST request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  post(request, response) {
    return JSON.stringify(request.body)
  }

  /**
   * Process a PUT request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  put(request, response) {
    return JSON.stringify(request.body)
  }

  /**
   * Process a DELETE request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  delete(request, response) {
    return JSON.stringify(request.query)
  }

  /**
   * Process a PATCH request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  patch(request, response) {
    return JSON.stringify([request.query, request.body])
  }

}

module.exports = RestWrapper