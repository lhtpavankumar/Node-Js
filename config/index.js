/**
 * Created by AyushK on 17/09/20.
 */

import { normalize } from 'path'
import { _extend as extend } from 'util'
import local from './env/local'
import development from './env/development'
import test from './env/test'
import production from './env/production'
const defaults = {
  root: normalize(__dirname + '/..')
}

/**
 * Expose
 */

export default {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults),
  local: extend(local, defaults)
}[process.env.NODE_ENV || 'development']
