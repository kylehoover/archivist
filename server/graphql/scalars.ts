import { GraphQLScalarType } from 'graphql'

import { AppSettingValue } from '../models/AppSetting'

export const AppSettingValueScalar = new GraphQLScalarType({
  description: 'App setting value scalar type. One of boolean, number, or string.',
  name: 'AppSettingValue',
  parseLiteral: (ast: any): AppSettingValue => ast.value,
  parseValue: (value: AppSettingValue): AppSettingValue => value,
  serialize: (value: AppSettingValue): AppSettingValue => value,
})

export const VoidScalar = new GraphQLScalarType({
  description: 'Void scalar type. Useful for mutations that don\'t need to return anything.',
  name: 'VoidScalar',
  parseLiteral: (): null => null,
  parseValue: (): null => null,
  serialize: (): null => null,
})
