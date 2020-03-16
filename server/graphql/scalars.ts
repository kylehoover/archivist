import { GraphQLScalarType } from 'graphql'

import { AppSettingValue } from '../models/AppSetting'

export const AppSettingValueScalar = new GraphQLScalarType({
  description: 'App setting value scalar type. One of boolean, number, or string.',
  name: 'AppSettingValue',
  parseLiteral: (ast: any): AppSettingValue => ast.value,
  parseValue: (value: AppSettingValue): AppSettingValue => value,
  serialize: (value: AppSettingValue): AppSettingValue => value,
})
