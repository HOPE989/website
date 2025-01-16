import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {readingTimeType} from "@/sanity/schemaTypes/types/readingTime";
import {projectType} from "@/sanity/schemaTypes/projectType";
import {settingType} from "@/sanity/schemaTypes/settingType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [readingTimeType, blockContentType, categoryType, postType, projectType, settingType],
}
