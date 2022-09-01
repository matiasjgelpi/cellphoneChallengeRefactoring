import { Types } from 'mongoose'

const isString = (value: any): boolean => typeof value === 'string'
const isNumber = (value: any): boolean => typeof value === 'number'

export const parseStrings = (value: any, name: string, edit: boolean): string => {
  if (!isString(value)) throw new TypeError(`${name} must be a string`)
  if (value.length === 0 && !edit) throw new TypeError(`${name} must not be empty`)

  return value
}

export const parseNumbers = (value: any, name: string, edit: boolean): number => {
  if (!isNumber(value)) throw new TypeError(`${name} must be a number`)
  if (value.length === 0 && !edit) throw new TypeError(`${name} must not be empty`)
  return value
}

export const parseIds = (id: any, name: string): Types.ObjectId => {
  if (!Types.ObjectId.isValid(id)) throw new TypeError(`${name} must be a valid ObjectId type`)
  if (id.length === 0) throw new TypeError(`${name} must not be empty`)
  return id
}
