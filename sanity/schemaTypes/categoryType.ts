import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: '分类',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: '名称',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: '链接标识符',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      title: '简单介绍',
      type: 'text',
    }),
  ],
})

