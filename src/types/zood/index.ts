import { z } from 'zod';
import type { Prisma } from '../../generated/prisma';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','cloudinaryImageId','password','provider','providerId','isActive','role','createdAt','description','interests']);

export const ReadingHistoryScalarFieldEnumSchema = z.enum(['id','userId','articleId','readAt','readTime']);

export const InfoScalarFieldEnumSchema = z.enum(['id','userId','firstName','lastName','bio','birthDate','website','phone','address','city','country','postalCode']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','accessToken','refreshToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const VoteScalarFieldEnumSchema = z.enum(['id','hashedIp','anonymousId','createdAt','pollId','pollOptionId','userId']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','slug']);

export const NewsItemScalarFieldEnumSchema = z.enum(['id','title','content','createdAt','pollId','blogId']);

export const PollScalarFieldEnumSchema = z.enum(['id','question','slug','description','startDate','endDate','createdAt','Archived','isPublic','ArchivedAt','Deleted','DeletedAt','categoryId','newsItemId']);

export const BlogScalarFieldEnumSchema = z.enum(['id','title','content','titlePunch','slug','imagenSeoId','seoDescription','dateNews','imagenCardId','newsItemId','readTime','views','dateCreated','categoryId']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','slug','description']);

export const BlogTagScalarFieldEnumSchema = z.enum(['id','blogId','tagId']);

export const BlogLikeScalarFieldEnumSchema = z.enum(['id','userId','blogId','createdAt']);

export const BlogAuthorScalarFieldEnumSchema = z.enum(['id','blogId','authorId']);

export const PollOptionScalarFieldEnumSchema = z.enum(['id','text','pollId']);

export const AuthorScalarFieldEnumSchema = z.enum(['id','name','link','description','twitter','instagram','facebook','linkedin','userId']);

export const SocialMediaScalarFieldEnumSchema = z.enum(['id','platform','url','username','isActive','createdAt','updatedAt','userId','authorId']);

export const ImageScalarFieldEnumSchema = z.enum(['id','url','publicId','alt','createdAt','userId','categoryId','newsItemId','blogId','pollId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['USER','LECTOR','COLABORADOR','ADMINISTRADOR','ROOT']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  cloudinaryImageId: z.string().nullable(),
  password: z.string().nullable(),
  provider: z.string().nullable(),
  providerId: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  description: z.string().nullable(),
  interests: z.string().array(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// READING HISTORY SCHEMA
/////////////////////////////////////////

export const ReadingHistorySchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  articleId: z.string(),
  readAt: z.coerce.date(),
  readTime: z.number().int(),
})

export type ReadingHistory = z.infer<typeof ReadingHistorySchema>

/////////////////////////////////////////
// INFO SCHEMA
/////////////////////////////////////////

export const InfoSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  bio: z.string().nullable(),
  birthDate: z.coerce.date().nullable(),
  website: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  postalCode: z.string().nullable(),
})

export type Info = z.infer<typeof InfoSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// VOTE SCHEMA
/////////////////////////////////////////

export const VoteSchema = z.object({
  id: z.string().uuid(),
  hashedIp: z.string(),
  anonymousId: z.string().nullable(),
  createdAt: z.coerce.date(),
  pollId: z.string(),
  pollOptionId: z.string(),
  userId: z.string().nullable(),
})

export type Vote = z.infer<typeof VoteSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// NEWS ITEM SCHEMA
/////////////////////////////////////////

export const NewsItemSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  pollId: z.string().nullable(),
  blogId: z.string().nullable(),
})

export type NewsItem = z.infer<typeof NewsItemSchema>

/////////////////////////////////////////
// POLL SCHEMA
/////////////////////////////////////////

export const PollSchema = z.object({
  id: z.string().uuid(),
  question: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  Archived: z.boolean(),
  isPublic: z.boolean(),
  ArchivedAt: z.coerce.date().nullable(),
  Deleted: z.boolean(),
  DeletedAt: z.coerce.date().nullable(),
  categoryId: z.string(),
  newsItemId: z.string().nullable(),
})

export type Poll = z.infer<typeof PollSchema>

/////////////////////////////////////////
// BLOG SCHEMA
/////////////////////////////////////////

export const BlogSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().nullable(),
  seoDescription: z.string().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().nullable(),
  newsItemId: z.string().nullable(),
  readTime: z.number().int().nullable(),
  views: z.number().int(),
  dateCreated: z.coerce.date(),
  categoryId: z.string().nullable(),
})

export type Blog = z.infer<typeof BlogSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// BLOG TAG SCHEMA
/////////////////////////////////////////

export const BlogTagSchema = z.object({
  id: z.string().cuid(),
  blogId: z.string(),
  tagId: z.string(),
})

export type BlogTag = z.infer<typeof BlogTagSchema>

/////////////////////////////////////////
// BLOG LIKE SCHEMA
/////////////////////////////////////////

export const BlogLikeSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  blogId: z.string(),
  createdAt: z.coerce.date(),
})

export type BlogLike = z.infer<typeof BlogLikeSchema>

/////////////////////////////////////////
// BLOG AUTHOR SCHEMA
/////////////////////////////////////////

export const BlogAuthorSchema = z.object({
  id: z.string().cuid(),
  blogId: z.string(),
  authorId: z.string(),
})

export type BlogAuthor = z.infer<typeof BlogAuthorSchema>

/////////////////////////////////////////
// POLL OPTION SCHEMA
/////////////////////////////////////////

export const PollOptionSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  pollId: z.string(),
})

export type PollOption = z.infer<typeof PollOptionSchema>

/////////////////////////////////////////
// AUTHOR SCHEMA
/////////////////////////////////////////

export const AuthorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  link: z.string().nullable(),
  description: z.string().nullable(),
  twitter: z.string().nullable(),
  instagram: z.string().nullable(),
  facebook: z.string().nullable(),
  linkedin: z.string().nullable(),
  userId: z.string().nullable(),
})

export type Author = z.infer<typeof AuthorSchema>

/////////////////////////////////////////
// SOCIAL MEDIA SCHEMA
/////////////////////////////////////////

export const SocialMediaSchema = z.object({
  id: z.string().cuid(),
  platform: z.string(),
  url: z.string(),
  username: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string().nullable(),
  authorId: z.string().nullable(),
})

export type SocialMedia = z.infer<typeof SocialMediaSchema>

/////////////////////////////////////////
// IMAGE SCHEMA
/////////////////////////////////////////

export const ImageSchema = z.object({
  id: z.string().cuid(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().nullable(),
  createdAt: z.coerce.date(),
  userId: z.string().nullable(),
  categoryId: z.string().nullable(),
  newsItemId: z.string().nullable(),
  blogId: z.string().nullable(),
  pollId: z.string().nullable(),
})

export type Image = z.infer<typeof ImageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  info: z.union([z.boolean(),z.lazy(() => InfoArgsSchema)]).optional(),
  blogLikes: z.union([z.boolean(),z.lazy(() => BlogLikeFindManyArgsSchema)]).optional(),
  authors: z.union([z.boolean(),z.lazy(() => AuthorFindManyArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  socialMedia: z.union([z.boolean(),z.lazy(() => SocialMediaFindManyArgsSchema)]).optional(),
  readingHistory: z.union([z.boolean(),z.lazy(() => ReadingHistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  votes: z.boolean().optional(),
  blogLikes: z.boolean().optional(),
  authors: z.boolean().optional(),
  Image: z.boolean().optional(),
  socialMedia: z.boolean().optional(),
  readingHistory: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  cloudinaryImageId: z.boolean().optional(),
  password: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerId: z.boolean().optional(),
  isActive: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  description: z.boolean().optional(),
  interests: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  info: z.union([z.boolean(),z.lazy(() => InfoArgsSchema)]).optional(),
  blogLikes: z.union([z.boolean(),z.lazy(() => BlogLikeFindManyArgsSchema)]).optional(),
  authors: z.union([z.boolean(),z.lazy(() => AuthorFindManyArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  socialMedia: z.union([z.boolean(),z.lazy(() => SocialMediaFindManyArgsSchema)]).optional(),
  readingHistory: z.union([z.boolean(),z.lazy(() => ReadingHistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// READING HISTORY
//------------------------------------------------------

export const ReadingHistoryIncludeSchema: z.ZodType<Prisma.ReadingHistoryInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ReadingHistoryArgsSchema: z.ZodType<Prisma.ReadingHistoryDefaultArgs> = z.object({
  select: z.lazy(() => ReadingHistorySelectSchema).optional(),
  include: z.lazy(() => ReadingHistoryIncludeSchema).optional(),
}).strict();

export const ReadingHistorySelectSchema: z.ZodType<Prisma.ReadingHistorySelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  articleId: z.boolean().optional(),
  readAt: z.boolean().optional(),
  readTime: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// INFO
//------------------------------------------------------

export const InfoIncludeSchema: z.ZodType<Prisma.InfoInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const InfoArgsSchema: z.ZodType<Prisma.InfoDefaultArgs> = z.object({
  select: z.lazy(() => InfoSelectSchema).optional(),
  include: z.lazy(() => InfoIncludeSchema).optional(),
}).strict();

export const InfoSelectSchema: z.ZodType<Prisma.InfoSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  bio: z.boolean().optional(),
  birthDate: z.boolean().optional(),
  website: z.boolean().optional(),
  phone: z.boolean().optional(),
  address: z.boolean().optional(),
  city: z.boolean().optional(),
  country: z.boolean().optional(),
  postalCode: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// VOTE
//------------------------------------------------------

export const VoteIncludeSchema: z.ZodType<Prisma.VoteInclude> = z.object({
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  pollOption: z.union([z.boolean(),z.lazy(() => PollOptionArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const VoteArgsSchema: z.ZodType<Prisma.VoteDefaultArgs> = z.object({
  select: z.lazy(() => VoteSelectSchema).optional(),
  include: z.lazy(() => VoteIncludeSchema).optional(),
}).strict();

export const VoteSelectSchema: z.ZodType<Prisma.VoteSelect> = z.object({
  id: z.boolean().optional(),
  hashedIp: z.boolean().optional(),
  anonymousId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  pollId: z.boolean().optional(),
  pollOptionId: z.boolean().optional(),
  userId: z.boolean().optional(),
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  pollOption: z.union([z.boolean(),z.lazy(() => PollOptionArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  polls: z.union([z.boolean(),z.lazy(() => PollFindManyArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  Blog: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  polls: z.boolean().optional(),
  Image: z.boolean().optional(),
  Blog: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  polls: z.union([z.boolean(),z.lazy(() => PollFindManyArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  Blog: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NEWS ITEM
//------------------------------------------------------

export const NewsItemIncludeSchema: z.ZodType<Prisma.NewsItemInclude> = z.object({
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NewsItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NewsItemArgsSchema: z.ZodType<Prisma.NewsItemDefaultArgs> = z.object({
  select: z.lazy(() => NewsItemSelectSchema).optional(),
  include: z.lazy(() => NewsItemIncludeSchema).optional(),
}).strict();

export const NewsItemCountOutputTypeArgsSchema: z.ZodType<Prisma.NewsItemCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NewsItemCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NewsItemCountOutputTypeSelectSchema: z.ZodType<Prisma.NewsItemCountOutputTypeSelect> = z.object({
  Image: z.boolean().optional(),
}).strict();

export const NewsItemSelectSchema: z.ZodType<Prisma.NewsItemSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  pollId: z.boolean().optional(),
  blogId: z.boolean().optional(),
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NewsItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POLL
//------------------------------------------------------

export const PollIncludeSchema: z.ZodType<Prisma.PollInclude> = z.object({
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  options: z.union([z.boolean(),z.lazy(() => PollOptionFindManyArgsSchema)]).optional(),
  Vote: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  newsItem: z.union([z.boolean(),z.lazy(() => NewsItemArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PollCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PollArgsSchema: z.ZodType<Prisma.PollDefaultArgs> = z.object({
  select: z.lazy(() => PollSelectSchema).optional(),
  include: z.lazy(() => PollIncludeSchema).optional(),
}).strict();

export const PollCountOutputTypeArgsSchema: z.ZodType<Prisma.PollCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PollCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PollCountOutputTypeSelectSchema: z.ZodType<Prisma.PollCountOutputTypeSelect> = z.object({
  options: z.boolean().optional(),
  Vote: z.boolean().optional(),
  Image: z.boolean().optional(),
}).strict();

export const PollSelectSchema: z.ZodType<Prisma.PollSelect> = z.object({
  id: z.boolean().optional(),
  question: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.boolean().optional(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  newsItemId: z.boolean().optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  options: z.union([z.boolean(),z.lazy(() => PollOptionFindManyArgsSchema)]).optional(),
  Vote: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  newsItem: z.union([z.boolean(),z.lazy(() => NewsItemArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PollCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BLOG
//------------------------------------------------------

export const BlogIncludeSchema: z.ZodType<Prisma.BlogInclude> = z.object({
  imagenSeo: z.union([z.boolean(),z.lazy(() => ImageArgsSchema)]).optional(),
  imagenCard: z.union([z.boolean(),z.lazy(() => ImageArgsSchema)]).optional(),
  newsItem: z.union([z.boolean(),z.lazy(() => NewsItemArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  blogAuthors: z.union([z.boolean(),z.lazy(() => BlogAuthorFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => BlogLikeFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => BlogTagFindManyArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BlogCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BlogArgsSchema: z.ZodType<Prisma.BlogDefaultArgs> = z.object({
  select: z.lazy(() => BlogSelectSchema).optional(),
  include: z.lazy(() => BlogIncludeSchema).optional(),
}).strict();

export const BlogCountOutputTypeArgsSchema: z.ZodType<Prisma.BlogCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BlogCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BlogCountOutputTypeSelectSchema: z.ZodType<Prisma.BlogCountOutputTypeSelect> = z.object({
  Image: z.boolean().optional(),
  blogAuthors: z.boolean().optional(),
  likes: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const BlogSelectSchema: z.ZodType<Prisma.BlogSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  titlePunch: z.boolean().optional(),
  slug: z.boolean().optional(),
  imagenSeoId: z.boolean().optional(),
  seoDescription: z.boolean().optional(),
  dateNews: z.boolean().optional(),
  imagenCardId: z.boolean().optional(),
  newsItemId: z.boolean().optional(),
  readTime: z.boolean().optional(),
  views: z.boolean().optional(),
  dateCreated: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  imagenSeo: z.union([z.boolean(),z.lazy(() => ImageArgsSchema)]).optional(),
  imagenCard: z.union([z.boolean(),z.lazy(() => ImageArgsSchema)]).optional(),
  newsItem: z.union([z.boolean(),z.lazy(() => NewsItemArgsSchema)]).optional(),
  Image: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  blogAuthors: z.union([z.boolean(),z.lazy(() => BlogAuthorFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => BlogLikeFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => BlogTagFindManyArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BlogCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  blogs: z.union([z.boolean(),z.lazy(() => BlogTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  blogs: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  blogs: z.union([z.boolean(),z.lazy(() => BlogTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BLOG TAG
//------------------------------------------------------

export const BlogTagIncludeSchema: z.ZodType<Prisma.BlogTagInclude> = z.object({
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

export const BlogTagArgsSchema: z.ZodType<Prisma.BlogTagDefaultArgs> = z.object({
  select: z.lazy(() => BlogTagSelectSchema).optional(),
  include: z.lazy(() => BlogTagIncludeSchema).optional(),
}).strict();

export const BlogTagSelectSchema: z.ZodType<Prisma.BlogTagSelect> = z.object({
  id: z.boolean().optional(),
  blogId: z.boolean().optional(),
  tagId: z.boolean().optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

// BLOG LIKE
//------------------------------------------------------

export const BlogLikeIncludeSchema: z.ZodType<Prisma.BlogLikeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
}).strict()

export const BlogLikeArgsSchema: z.ZodType<Prisma.BlogLikeDefaultArgs> = z.object({
  select: z.lazy(() => BlogLikeSelectSchema).optional(),
  include: z.lazy(() => BlogLikeIncludeSchema).optional(),
}).strict();

export const BlogLikeSelectSchema: z.ZodType<Prisma.BlogLikeSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  blogId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
}).strict()

// BLOG AUTHOR
//------------------------------------------------------

export const BlogAuthorIncludeSchema: z.ZodType<Prisma.BlogAuthorInclude> = z.object({
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => AuthorArgsSchema)]).optional(),
}).strict()

export const BlogAuthorArgsSchema: z.ZodType<Prisma.BlogAuthorDefaultArgs> = z.object({
  select: z.lazy(() => BlogAuthorSelectSchema).optional(),
  include: z.lazy(() => BlogAuthorIncludeSchema).optional(),
}).strict();

export const BlogAuthorSelectSchema: z.ZodType<Prisma.BlogAuthorSelect> = z.object({
  id: z.boolean().optional(),
  blogId: z.boolean().optional(),
  authorId: z.boolean().optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => AuthorArgsSchema)]).optional(),
}).strict()

// POLL OPTION
//------------------------------------------------------

export const PollOptionIncludeSchema: z.ZodType<Prisma.PollOptionInclude> = z.object({
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PollOptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PollOptionArgsSchema: z.ZodType<Prisma.PollOptionDefaultArgs> = z.object({
  select: z.lazy(() => PollOptionSelectSchema).optional(),
  include: z.lazy(() => PollOptionIncludeSchema).optional(),
}).strict();

export const PollOptionCountOutputTypeArgsSchema: z.ZodType<Prisma.PollOptionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PollOptionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PollOptionCountOutputTypeSelectSchema: z.ZodType<Prisma.PollOptionCountOutputTypeSelect> = z.object({
  votes: z.boolean().optional(),
}).strict();

export const PollOptionSelectSchema: z.ZodType<Prisma.PollOptionSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  pollId: z.boolean().optional(),
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  votes: z.union([z.boolean(),z.lazy(() => VoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PollOptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AUTHOR
//------------------------------------------------------

export const AuthorIncludeSchema: z.ZodType<Prisma.AuthorInclude> = z.object({
  blogAuthors: z.union([z.boolean(),z.lazy(() => BlogAuthorFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  socialMedia: z.union([z.boolean(),z.lazy(() => SocialMediaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AuthorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AuthorArgsSchema: z.ZodType<Prisma.AuthorDefaultArgs> = z.object({
  select: z.lazy(() => AuthorSelectSchema).optional(),
  include: z.lazy(() => AuthorIncludeSchema).optional(),
}).strict();

export const AuthorCountOutputTypeArgsSchema: z.ZodType<Prisma.AuthorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AuthorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AuthorCountOutputTypeSelectSchema: z.ZodType<Prisma.AuthorCountOutputTypeSelect> = z.object({
  blogAuthors: z.boolean().optional(),
  socialMedia: z.boolean().optional(),
}).strict();

export const AuthorSelectSchema: z.ZodType<Prisma.AuthorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  link: z.boolean().optional(),
  description: z.boolean().optional(),
  twitter: z.boolean().optional(),
  instagram: z.boolean().optional(),
  facebook: z.boolean().optional(),
  linkedin: z.boolean().optional(),
  userId: z.boolean().optional(),
  blogAuthors: z.union([z.boolean(),z.lazy(() => BlogAuthorFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  socialMedia: z.union([z.boolean(),z.lazy(() => SocialMediaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AuthorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SOCIAL MEDIA
//------------------------------------------------------

export const SocialMediaIncludeSchema: z.ZodType<Prisma.SocialMediaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => AuthorArgsSchema)]).optional(),
}).strict()

export const SocialMediaArgsSchema: z.ZodType<Prisma.SocialMediaDefaultArgs> = z.object({
  select: z.lazy(() => SocialMediaSelectSchema).optional(),
  include: z.lazy(() => SocialMediaIncludeSchema).optional(),
}).strict();

export const SocialMediaSelectSchema: z.ZodType<Prisma.SocialMediaSelect> = z.object({
  id: z.boolean().optional(),
  platform: z.boolean().optional(),
  url: z.boolean().optional(),
  username: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  authorId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => AuthorArgsSchema)]).optional(),
}).strict()

// IMAGE
//------------------------------------------------------

export const ImageIncludeSchema: z.ZodType<Prisma.ImageInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  newsItem: z.union([z.boolean(),z.lazy(() => NewsItemArgsSchema)]).optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  blogImagenSeo: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  blogImagenCard: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ImageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ImageArgsSchema: z.ZodType<Prisma.ImageDefaultArgs> = z.object({
  select: z.lazy(() => ImageSelectSchema).optional(),
  include: z.lazy(() => ImageIncludeSchema).optional(),
}).strict();

export const ImageCountOutputTypeArgsSchema: z.ZodType<Prisma.ImageCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ImageCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ImageCountOutputTypeSelectSchema: z.ZodType<Prisma.ImageCountOutputTypeSelect> = z.object({
  blogImagenSeo: z.boolean().optional(),
  blogImagenCard: z.boolean().optional(),
}).strict();

export const ImageSelectSchema: z.ZodType<Prisma.ImageSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  publicId: z.boolean().optional(),
  alt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  newsItemId: z.boolean().optional(),
  blogId: z.boolean().optional(),
  pollId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  newsItem: z.union([z.boolean(),z.lazy(() => NewsItemArgsSchema)]).optional(),
  blog: z.union([z.boolean(),z.lazy(() => BlogArgsSchema)]).optional(),
  poll: z.union([z.boolean(),z.lazy(() => PollArgsSchema)]).optional(),
  blogImagenSeo: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  blogImagenCard: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ImageCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  providerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  interests: z.lazy(() => StringNullableListFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional(),
  info: z.union([ z.lazy(() => InfoNullableScalarRelationFilterSchema),z.lazy(() => InfoWhereInputSchema) ]).optional().nullable(),
  blogLikes: z.lazy(() => BlogLikeListRelationFilterSchema).optional(),
  authors: z.lazy(() => AuthorListRelationFilterSchema).optional(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaListRelationFilterSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cloudinaryImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  providerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  interests: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  votes: z.lazy(() => VoteOrderByRelationAggregateInputSchema).optional(),
  info: z.lazy(() => InfoOrderByWithRelationInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeOrderByRelationAggregateInputSchema).optional(),
  authors: z.lazy(() => AuthorOrderByRelationAggregateInputSchema).optional(),
  Image: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaOrderByRelationAggregateInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  providerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  interests: z.lazy(() => StringNullableListFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional(),
  info: z.union([ z.lazy(() => InfoNullableScalarRelationFilterSchema),z.lazy(() => InfoWhereInputSchema) ]).optional().nullable(),
  blogLikes: z.lazy(() => BlogLikeListRelationFilterSchema).optional(),
  authors: z.lazy(() => AuthorListRelationFilterSchema).optional(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaListRelationFilterSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cloudinaryImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  providerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  interests: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  providerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  interests: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const ReadingHistoryWhereInputSchema: z.ZodType<Prisma.ReadingHistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReadingHistoryWhereInputSchema),z.lazy(() => ReadingHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReadingHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReadingHistoryWhereInputSchema),z.lazy(() => ReadingHistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  readTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ReadingHistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.ReadingHistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  readAt: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ReadingHistoryWhereUniqueInputSchema: z.ZodType<Prisma.ReadingHistoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_articleId: z.lazy(() => ReadingHistoryUserIdArticleIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_articleId: z.lazy(() => ReadingHistoryUserIdArticleIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_articleId: z.lazy(() => ReadingHistoryUserIdArticleIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ReadingHistoryWhereInputSchema),z.lazy(() => ReadingHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReadingHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReadingHistoryWhereInputSchema),z.lazy(() => ReadingHistoryWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  readTime: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ReadingHistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReadingHistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  readAt: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReadingHistoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReadingHistoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReadingHistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReadingHistoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReadingHistorySumOrderByAggregateInputSchema).optional()
}).strict();

export const ReadingHistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReadingHistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReadingHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => ReadingHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReadingHistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReadingHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => ReadingHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  readAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  readTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const InfoWhereInputSchema: z.ZodType<Prisma.InfoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InfoWhereInputSchema),z.lazy(() => InfoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InfoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InfoWhereInputSchema),z.lazy(() => InfoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const InfoOrderByWithRelationInputSchema: z.ZodType<Prisma.InfoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const InfoWhereUniqueInputSchema: z.ZodType<Prisma.InfoWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => InfoWhereInputSchema),z.lazy(() => InfoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InfoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InfoWhereInputSchema),z.lazy(() => InfoWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const InfoOrderByWithAggregationInputSchema: z.ZodType<Prisma.InfoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => InfoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InfoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InfoMinOrderByAggregateInputSchema).optional()
}).strict();

export const InfoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InfoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InfoScalarWhereWithAggregatesInputSchema),z.lazy(() => InfoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InfoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InfoScalarWhereWithAggregatesInputSchema),z.lazy(() => InfoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  postalCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
})
.and(z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VoteWhereInputSchema: z.ZodType<Prisma.VoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedIp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  anonymousId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pollId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pollOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  poll: z.union([ z.lazy(() => PollScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional(),
  pollOption: z.union([ z.lazy(() => PollOptionScalarRelationFilterSchema),z.lazy(() => PollOptionWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const VoteOrderByWithRelationInputSchema: z.ZodType<Prisma.VoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashedIp: z.lazy(() => SortOrderSchema).optional(),
  anonymousId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  pollOptionId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  poll: z.lazy(() => PollOrderByWithRelationInputSchema).optional(),
  pollOption: z.lazy(() => PollOptionOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const VoteWhereUniqueInputSchema: z.ZodType<Prisma.VoteWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteWhereInputSchema),z.lazy(() => VoteWhereInputSchema).array() ]).optional(),
  hashedIp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  anonymousId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pollId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pollOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  poll: z.union([ z.lazy(() => PollScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional(),
  pollOption: z.union([ z.lazy(() => PollOptionScalarRelationFilterSchema),z.lazy(() => PollOptionWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const VoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.VoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashedIp: z.lazy(() => SortOrderSchema).optional(),
  anonymousId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  pollOptionId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => VoteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VoteMinOrderByAggregateInputSchema).optional()
}).strict();

export const VoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VoteScalarWhereWithAggregatesInputSchema),z.lazy(() => VoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteScalarWhereWithAggregatesInputSchema),z.lazy(() => VoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hashedIp: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  anonymousId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pollId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pollOptionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  polls: z.lazy(() => PollListRelationFilterSchema).optional(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional(),
  Blog: z.lazy(() => BlogListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  polls: z.lazy(() => PollOrderByRelationAggregateInputSchema).optional(),
  Image: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional(),
  Blog: z.lazy(() => BlogOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  polls: z.lazy(() => PollListRelationFilterSchema).optional(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional(),
  Blog: z.lazy(() => BlogListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const NewsItemWhereInputSchema: z.ZodType<Prisma.NewsItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NewsItemWhereInputSchema),z.lazy(() => NewsItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsItemWhereInputSchema),z.lazy(() => NewsItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pollId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  poll: z.union([ z.lazy(() => PollNullableScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional().nullable(),
  blog: z.union([ z.lazy(() => BlogNullableScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict();

export const NewsItemOrderByWithRelationInputSchema: z.ZodType<Prisma.NewsItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blogId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  poll: z.lazy(() => PollOrderByWithRelationInputSchema).optional(),
  blog: z.lazy(() => BlogOrderByWithRelationInputSchema).optional(),
  Image: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const NewsItemWhereUniqueInputSchema: z.ZodType<Prisma.NewsItemWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    pollId: z.string(),
    blogId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    pollId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    blogId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    pollId: z.string(),
    blogId: z.string(),
  }),
  z.object({
    pollId: z.string(),
  }),
  z.object({
    blogId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  pollId: z.string().optional(),
  blogId: z.string().optional(),
  AND: z.union([ z.lazy(() => NewsItemWhereInputSchema),z.lazy(() => NewsItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsItemWhereInputSchema),z.lazy(() => NewsItemWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  poll: z.union([ z.lazy(() => PollNullableScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional().nullable(),
  blog: z.union([ z.lazy(() => BlogNullableScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict());

export const NewsItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.NewsItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blogId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => NewsItemCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NewsItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NewsItemMinOrderByAggregateInputSchema).optional()
}).strict();

export const NewsItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NewsItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NewsItemScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsItemScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pollId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  blogId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PollWhereInputSchema: z.ZodType<Prisma.PollWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PollWhereInputSchema),z.lazy(() => PollWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollWhereInputSchema),z.lazy(() => PollWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ArchivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  DeletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  newsItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  options: z.lazy(() => PollOptionListRelationFilterSchema).optional(),
  Vote: z.lazy(() => VoteListRelationFilterSchema).optional(),
  newsItem: z.union([ z.lazy(() => NewsItemNullableScalarRelationFilterSchema),z.lazy(() => NewsItemWhereInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict();

export const PollOrderByWithRelationInputSchema: z.ZodType<Prisma.PollOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  Archived: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  ArchivedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Deleted: z.lazy(() => SortOrderSchema).optional(),
  DeletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  options: z.lazy(() => PollOptionOrderByRelationAggregateInputSchema).optional(),
  Vote: z.lazy(() => VoteOrderByRelationAggregateInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemOrderByWithRelationInputSchema).optional(),
  Image: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PollWhereUniqueInputSchema: z.ZodType<Prisma.PollWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    slug: z.string(),
    newsItemId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    slug: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    newsItemId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    slug: z.string(),
    newsItemId: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
  z.object({
    newsItemId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  slug: z.string().optional(),
  newsItemId: z.string().optional(),
  AND: z.union([ z.lazy(() => PollWhereInputSchema),z.lazy(() => PollWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollWhereInputSchema),z.lazy(() => PollWhereInputSchema).array() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ArchivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  DeletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => CategoryScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  options: z.lazy(() => PollOptionListRelationFilterSchema).optional(),
  Vote: z.lazy(() => VoteListRelationFilterSchema).optional(),
  newsItem: z.union([ z.lazy(() => NewsItemNullableScalarRelationFilterSchema),z.lazy(() => NewsItemWhereInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict());

export const PollOrderByWithAggregationInputSchema: z.ZodType<Prisma.PollOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  Archived: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  ArchivedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Deleted: z.lazy(() => SortOrderSchema).optional(),
  DeletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PollCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PollMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PollMinOrderByAggregateInputSchema).optional()
}).strict();

export const PollScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PollScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PollScalarWhereWithAggregatesInputSchema),z.lazy(() => PollScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollScalarWhereWithAggregatesInputSchema),z.lazy(() => PollScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  Archived: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  ArchivedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  Deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  DeletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  newsItemId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const BlogWhereInputSchema: z.ZodType<Prisma.BlogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  titlePunch: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imagenSeoId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seoDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateNews: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imagenCardId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  newsItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  readTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imagenSeo: z.union([ z.lazy(() => ImageNullableScalarRelationFilterSchema),z.lazy(() => ImageWhereInputSchema) ]).optional().nullable(),
  imagenCard: z.union([ z.lazy(() => ImageNullableScalarRelationFilterSchema),z.lazy(() => ImageWhereInputSchema) ]).optional().nullable(),
  newsItem: z.union([ z.lazy(() => NewsItemNullableScalarRelationFilterSchema),z.lazy(() => NewsItemWhereInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorListRelationFilterSchema).optional(),
  likes: z.lazy(() => BlogLikeListRelationFilterSchema).optional(),
  tags: z.lazy(() => BlogTagListRelationFilterSchema).optional(),
  Category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict();

export const BlogOrderByWithRelationInputSchema: z.ZodType<Prisma.BlogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  titlePunch: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  imagenSeoId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seoDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateNews: z.lazy(() => SortOrderSchema).optional(),
  imagenCardId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  newsItemId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  readTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageOrderByWithRelationInputSchema).optional(),
  imagenCard: z.lazy(() => ImageOrderByWithRelationInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemOrderByWithRelationInputSchema).optional(),
  Image: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => BlogLikeOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => BlogTagOrderByRelationAggregateInputSchema).optional(),
  Category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const BlogWhereUniqueInputSchema: z.ZodType<Prisma.BlogWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string(),
    newsItemId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    slug: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    newsItemId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
    newsItemId: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
  z.object({
    newsItemId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  newsItemId: z.string().optional(),
  AND: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  titlePunch: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imagenSeoId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seoDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateNews: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imagenCardId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  readTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imagenSeo: z.union([ z.lazy(() => ImageNullableScalarRelationFilterSchema),z.lazy(() => ImageWhereInputSchema) ]).optional().nullable(),
  imagenCard: z.union([ z.lazy(() => ImageNullableScalarRelationFilterSchema),z.lazy(() => ImageWhereInputSchema) ]).optional().nullable(),
  newsItem: z.union([ z.lazy(() => NewsItemNullableScalarRelationFilterSchema),z.lazy(() => NewsItemWhereInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageListRelationFilterSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorListRelationFilterSchema).optional(),
  likes: z.lazy(() => BlogLikeListRelationFilterSchema).optional(),
  tags: z.lazy(() => BlogTagListRelationFilterSchema).optional(),
  Category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict());

export const BlogOrderByWithAggregationInputSchema: z.ZodType<Prisma.BlogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  titlePunch: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  imagenSeoId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seoDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateNews: z.lazy(() => SortOrderSchema).optional(),
  imagenCardId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  newsItemId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  readTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => BlogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BlogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BlogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BlogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BlogSumOrderByAggregateInputSchema).optional()
}).strict();

export const BlogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BlogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BlogScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  titlePunch: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imagenSeoId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  seoDescription: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  dateNews: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  imagenCardId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  newsItemId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  readTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogs: z.lazy(() => BlogTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    name: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    slug: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
    slug: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogs: z.lazy(() => BlogTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const BlogTagWhereInputSchema: z.ZodType<Prisma.BlogTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogTagWhereInputSchema),z.lazy(() => BlogTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogTagWhereInputSchema),z.lazy(() => BlogTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blog: z.union([ z.lazy(() => BlogScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict();

export const BlogTagOrderByWithRelationInputSchema: z.ZodType<Prisma.BlogTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  blog: z.lazy(() => BlogOrderByWithRelationInputSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional()
}).strict();

export const BlogTagWhereUniqueInputSchema: z.ZodType<Prisma.BlogTagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    blogId_tagId: z.lazy(() => BlogTagBlogIdTagIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    blogId_tagId: z.lazy(() => BlogTagBlogIdTagIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  blogId_tagId: z.lazy(() => BlogTagBlogIdTagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BlogTagWhereInputSchema),z.lazy(() => BlogTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogTagWhereInputSchema),z.lazy(() => BlogTagWhereInputSchema).array() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blog: z.union([ z.lazy(() => BlogScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict());

export const BlogTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.BlogTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BlogTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BlogTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BlogTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const BlogTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BlogTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BlogTagScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogTagScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BlogLikeWhereInputSchema: z.ZodType<Prisma.BlogLikeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogLikeWhereInputSchema),z.lazy(() => BlogLikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogLikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogLikeWhereInputSchema),z.lazy(() => BlogLikeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  blog: z.union([ z.lazy(() => BlogScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional(),
}).strict();

export const BlogLikeOrderByWithRelationInputSchema: z.ZodType<Prisma.BlogLikeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  blog: z.lazy(() => BlogOrderByWithRelationInputSchema).optional()
}).strict();

export const BlogLikeWhereUniqueInputSchema: z.ZodType<Prisma.BlogLikeWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_blogId: z.lazy(() => BlogLikeUserIdBlogIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_blogId: z.lazy(() => BlogLikeUserIdBlogIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_blogId: z.lazy(() => BlogLikeUserIdBlogIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BlogLikeWhereInputSchema),z.lazy(() => BlogLikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogLikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogLikeWhereInputSchema),z.lazy(() => BlogLikeWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  blog: z.union([ z.lazy(() => BlogScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional(),
}).strict());

export const BlogLikeOrderByWithAggregationInputSchema: z.ZodType<Prisma.BlogLikeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BlogLikeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BlogLikeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BlogLikeMinOrderByAggregateInputSchema).optional()
}).strict();

export const BlogLikeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BlogLikeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BlogLikeScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogLikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogLikeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogLikeScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogLikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BlogAuthorWhereInputSchema: z.ZodType<Prisma.BlogAuthorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogAuthorWhereInputSchema),z.lazy(() => BlogAuthorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogAuthorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogAuthorWhereInputSchema),z.lazy(() => BlogAuthorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blog: z.union([ z.lazy(() => BlogScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => AuthorScalarRelationFilterSchema),z.lazy(() => AuthorWhereInputSchema) ]).optional(),
}).strict();

export const BlogAuthorOrderByWithRelationInputSchema: z.ZodType<Prisma.BlogAuthorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  blog: z.lazy(() => BlogOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => AuthorOrderByWithRelationInputSchema).optional()
}).strict();

export const BlogAuthorWhereUniqueInputSchema: z.ZodType<Prisma.BlogAuthorWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    blogId_authorId: z.lazy(() => BlogAuthorBlogIdAuthorIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    blogId_authorId: z.lazy(() => BlogAuthorBlogIdAuthorIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  blogId_authorId: z.lazy(() => BlogAuthorBlogIdAuthorIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BlogAuthorWhereInputSchema),z.lazy(() => BlogAuthorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogAuthorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogAuthorWhereInputSchema),z.lazy(() => BlogAuthorWhereInputSchema).array() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blog: z.union([ z.lazy(() => BlogScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => AuthorScalarRelationFilterSchema),z.lazy(() => AuthorWhereInputSchema) ]).optional(),
}).strict());

export const BlogAuthorOrderByWithAggregationInputSchema: z.ZodType<Prisma.BlogAuthorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BlogAuthorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BlogAuthorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BlogAuthorMinOrderByAggregateInputSchema).optional()
}).strict();

export const BlogAuthorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BlogAuthorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BlogAuthorScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogAuthorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogAuthorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogAuthorScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogAuthorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PollOptionWhereInputSchema: z.ZodType<Prisma.PollOptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PollOptionWhereInputSchema),z.lazy(() => PollOptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollOptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollOptionWhereInputSchema),z.lazy(() => PollOptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pollId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  poll: z.union([ z.lazy(() => PollScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional()
}).strict();

export const PollOptionOrderByWithRelationInputSchema: z.ZodType<Prisma.PollOptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  poll: z.lazy(() => PollOrderByWithRelationInputSchema).optional(),
  votes: z.lazy(() => VoteOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PollOptionWhereUniqueInputSchema: z.ZodType<Prisma.PollOptionWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => PollOptionWhereInputSchema),z.lazy(() => PollOptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollOptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollOptionWhereInputSchema),z.lazy(() => PollOptionWhereInputSchema).array() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pollId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  poll: z.union([ z.lazy(() => PollScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional(),
  votes: z.lazy(() => VoteListRelationFilterSchema).optional()
}).strict());

export const PollOptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PollOptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PollOptionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PollOptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PollOptionMinOrderByAggregateInputSchema).optional()
}).strict();

export const PollOptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PollOptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PollOptionScalarWhereWithAggregatesInputSchema),z.lazy(() => PollOptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollOptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollOptionScalarWhereWithAggregatesInputSchema),z.lazy(() => PollOptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pollId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AuthorWhereInputSchema: z.ZodType<Prisma.AuthorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitter: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  facebook: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaListRelationFilterSchema).optional()
}).strict();

export const AuthorOrderByWithRelationInputSchema: z.ZodType<Prisma.AuthorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  facebook: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blogAuthors: z.lazy(() => BlogAuthorOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AuthorWhereUniqueInputSchema: z.ZodType<Prisma.AuthorWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string(),
    userId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    name: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
    userId: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthorWhereInputSchema),z.lazy(() => AuthorWhereInputSchema).array() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitter: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  facebook: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaListRelationFilterSchema).optional()
}).strict());

export const AuthorOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuthorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  facebook: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AuthorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuthorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuthorMinOrderByAggregateInputSchema).optional()
}).strict();

export const AuthorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuthorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  twitter: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  facebook: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SocialMediaWhereInputSchema: z.ZodType<Prisma.SocialMediaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SocialMediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => AuthorNullableScalarRelationFilterSchema),z.lazy(() => AuthorWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaOrderByWithRelationInputSchema: z.ZodType<Prisma.SocialMediaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => AuthorOrderByWithRelationInputSchema).optional()
}).strict();

export const SocialMediaWhereUniqueInputSchema: z.ZodType<Prisma.SocialMediaWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_platform: z.lazy(() => SocialMediaUserIdPlatformCompoundUniqueInputSchema),
    authorId_platform: z.lazy(() => SocialMediaAuthorIdPlatformCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
    userId_platform: z.lazy(() => SocialMediaUserIdPlatformCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string().cuid(),
    authorId_platform: z.lazy(() => SocialMediaAuthorIdPlatformCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_platform: z.lazy(() => SocialMediaUserIdPlatformCompoundUniqueInputSchema),
    authorId_platform: z.lazy(() => SocialMediaAuthorIdPlatformCompoundUniqueInputSchema),
  }),
  z.object({
    userId_platform: z.lazy(() => SocialMediaUserIdPlatformCompoundUniqueInputSchema),
  }),
  z.object({
    authorId_platform: z.lazy(() => SocialMediaAuthorIdPlatformCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_platform: z.lazy(() => SocialMediaUserIdPlatformCompoundUniqueInputSchema).optional(),
  authorId_platform: z.lazy(() => SocialMediaAuthorIdPlatformCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SocialMediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  platform: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => AuthorNullableScalarRelationFilterSchema),z.lazy(() => AuthorWhereInputSchema) ]).optional().nullable(),
}).strict());

export const SocialMediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.SocialMediaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SocialMediaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SocialMediaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SocialMediaMinOrderByAggregateInputSchema).optional()
}).strict();

export const SocialMediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SocialMediaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema),z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema),z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ImageWhereInputSchema: z.ZodType<Prisma.ImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  newsItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pollId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  newsItem: z.union([ z.lazy(() => NewsItemNullableScalarRelationFilterSchema),z.lazy(() => NewsItemWhereInputSchema) ]).optional().nullable(),
  blog: z.union([ z.lazy(() => BlogNullableScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional().nullable(),
  poll: z.union([ z.lazy(() => PollNullableScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogListRelationFilterSchema).optional(),
  blogImagenCard: z.lazy(() => BlogListRelationFilterSchema).optional()
}).strict();

export const ImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  publicId: z.lazy(() => SortOrderSchema).optional(),
  alt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  newsItemId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blogId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pollId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemOrderByWithRelationInputSchema).optional(),
  blog: z.lazy(() => BlogOrderByWithRelationInputSchema).optional(),
  poll: z.lazy(() => PollOrderByWithRelationInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogOrderByRelationAggregateInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ImageWhereUniqueInputSchema: z.ZodType<Prisma.ImageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  newsItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pollId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  newsItem: z.union([ z.lazy(() => NewsItemNullableScalarRelationFilterSchema),z.lazy(() => NewsItemWhereInputSchema) ]).optional().nullable(),
  blog: z.union([ z.lazy(() => BlogNullableScalarRelationFilterSchema),z.lazy(() => BlogWhereInputSchema) ]).optional().nullable(),
  poll: z.union([ z.lazy(() => PollNullableScalarRelationFilterSchema),z.lazy(() => PollWhereInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogListRelationFilterSchema).optional(),
  blogImagenCard: z.lazy(() => BlogListRelationFilterSchema).optional()
}).strict());

export const ImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  publicId: z.lazy(() => SortOrderSchema).optional(),
  alt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  newsItemId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blogId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pollId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ImageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImageMinOrderByAggregateInputSchema).optional()
}).strict();

export const ImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publicId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  alt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  newsItemId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  blogId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  pollId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
}).strict();

export const ReadingHistoryCreateInputSchema: z.ZodType<Prisma.ReadingHistoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  articleId: z.string(),
  readAt: z.coerce.date().optional(),
  readTime: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutReadingHistoryInputSchema)
}).strict();

export const ReadingHistoryUncheckedCreateInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  articleId: z.string(),
  readAt: z.coerce.date().optional(),
  readTime: z.number().int()
}).strict();

export const ReadingHistoryUpdateInputSchema: z.ZodType<Prisma.ReadingHistoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReadingHistoryNestedInputSchema).optional()
}).strict();

export const ReadingHistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReadingHistoryCreateManyInputSchema: z.ZodType<Prisma.ReadingHistoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  articleId: z.string(),
  readAt: z.coerce.date().optional(),
  readTime: z.number().int()
}).strict();

export const ReadingHistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.ReadingHistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReadingHistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InfoCreateInputSchema: z.ZodType<Prisma.InfoCreateInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutInfoInputSchema)
}).strict();

export const InfoUncheckedCreateInputSchema: z.ZodType<Prisma.InfoUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable()
}).strict();

export const InfoUpdateInputSchema: z.ZodType<Prisma.InfoUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInfoNestedInputSchema).optional()
}).strict();

export const InfoUncheckedUpdateInputSchema: z.ZodType<Prisma.InfoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InfoCreateManyInputSchema: z.ZodType<Prisma.InfoCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable()
}).strict();

export const InfoUpdateManyMutationInputSchema: z.ZodType<Prisma.InfoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InfoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InfoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteCreateInputSchema: z.ZodType<Prisma.VoteCreateInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutVoteInputSchema),
  pollOption: z.lazy(() => PollOptionCreateNestedOneWithoutVotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutVotesInputSchema).optional()
}).strict();

export const VoteUncheckedCreateInputSchema: z.ZodType<Prisma.VoteUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string(),
  pollOptionId: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const VoteUpdateInputSchema: z.ZodType<Prisma.VoteUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  poll: z.lazy(() => PollUpdateOneRequiredWithoutVoteNestedInputSchema).optional(),
  pollOption: z.lazy(() => PollOptionUpdateOneRequiredWithoutVotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutVotesNestedInputSchema).optional()
}).strict();

export const VoteUncheckedUpdateInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pollOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VoteCreateManyInputSchema: z.ZodType<Prisma.VoteCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string(),
  pollOptionId: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const VoteUpdateManyMutationInputSchema: z.ZodType<Prisma.VoteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pollOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  polls: z.lazy(() => PollCreateNestedManyWithoutCategoryInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutCategoryInputSchema).optional(),
  Blog: z.lazy(() => BlogCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  polls: z.lazy(() => PollUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  Blog: z.lazy(() => BlogUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  polls: z.lazy(() => PollUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Blog: z.lazy(() => BlogUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  polls: z.lazy(() => PollUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Blog: z.lazy(() => BlogUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsItemCreateInputSchema: z.ZodType<Prisma.NewsItemCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  poll: z.lazy(() => PollCreateNestedOneWithoutNewsItemInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutNewsItemInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemUncheckedCreateInputSchema: z.ZodType<Prisma.NewsItemUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  poll: z.lazy(() => PollUncheckedCreateNestedOneWithoutNewsItemInputSchema).optional(),
  blog: z.lazy(() => BlogUncheckedCreateNestedOneWithoutNewsItemInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemUpdateInputSchema: z.ZodType<Prisma.NewsItemUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  poll: z.lazy(() => PollUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const NewsItemUncheckedUpdateInputSchema: z.ZodType<Prisma.NewsItemUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  poll: z.lazy(() => PollUncheckedUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUncheckedUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const NewsItemCreateManyInputSchema: z.ZodType<Prisma.NewsItemCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable()
}).strict();

export const NewsItemUpdateManyMutationInputSchema: z.ZodType<Prisma.NewsItemUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NewsItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NewsItemUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PollCreateInputSchema: z.ZodType<Prisma.PollCreateInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutPollsInputSchema),
  options: z.lazy(() => PollOptionCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteCreateNestedManyWithoutPollInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollUncheckedCreateInputSchema: z.ZodType<Prisma.PollUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string(),
  newsItemId: z.string().optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollUpdateInputSchema: z.ZodType<Prisma.PollUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutPollsNestedInputSchema).optional(),
  options: z.lazy(() => PollOptionUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUpdateManyWithoutPollNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollUncheckedUpdateInputSchema: z.ZodType<Prisma.PollUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollCreateManyInputSchema: z.ZodType<Prisma.PollCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string(),
  newsItemId: z.string().optional().nullable()
}).strict();

export const PollUpdateManyMutationInputSchema: z.ZodType<Prisma.PollUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PollUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PollUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogCreateInputSchema: z.ZodType<Prisma.BlogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateInputSchema: z.ZodType<Prisma.BlogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogUpdateInputSchema: z.ZodType<Prisma.BlogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogCreateManyInputSchema: z.ZodType<Prisma.BlogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable()
}).strict();

export const BlogUpdateManyMutationInputSchema: z.ZodType<Prisma.BlogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  blogs: z.lazy(() => BlogTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  blogs: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogs: z.lazy(() => BlogTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogs: z.lazy(() => BlogTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogTagCreateInputSchema: z.ZodType<Prisma.BlogTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutTagsInputSchema),
  tag: z.lazy(() => TagCreateNestedOneWithoutBlogsInputSchema)
}).strict();

export const BlogTagUncheckedCreateInputSchema: z.ZodType<Prisma.BlogTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string(),
  tagId: z.string()
}).strict();

export const BlogTagUpdateInputSchema: z.ZodType<Prisma.BlogTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blog: z.lazy(() => BlogUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutBlogsNestedInputSchema).optional()
}).strict();

export const BlogTagUncheckedUpdateInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogTagCreateManyInputSchema: z.ZodType<Prisma.BlogTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string(),
  tagId: z.string()
}).strict();

export const BlogTagUpdateManyMutationInputSchema: z.ZodType<Prisma.BlogTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogLikeCreateInputSchema: z.ZodType<Prisma.BlogLikeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBlogLikesInputSchema),
  blog: z.lazy(() => BlogCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const BlogLikeUncheckedCreateInputSchema: z.ZodType<Prisma.BlogLikeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  blogId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const BlogLikeUpdateInputSchema: z.ZodType<Prisma.BlogLikeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBlogLikesNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const BlogLikeUncheckedUpdateInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogLikeCreateManyInputSchema: z.ZodType<Prisma.BlogLikeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  blogId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const BlogLikeUpdateManyMutationInputSchema: z.ZodType<Prisma.BlogLikeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogLikeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogAuthorCreateInputSchema: z.ZodType<Prisma.BlogAuthorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutBlogAuthorsInputSchema),
  author: z.lazy(() => AuthorCreateNestedOneWithoutBlogAuthorsInputSchema)
}).strict();

export const BlogAuthorUncheckedCreateInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string(),
  authorId: z.string()
}).strict();

export const BlogAuthorUpdateInputSchema: z.ZodType<Prisma.BlogAuthorUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blog: z.lazy(() => BlogUpdateOneRequiredWithoutBlogAuthorsNestedInputSchema).optional(),
  author: z.lazy(() => AuthorUpdateOneRequiredWithoutBlogAuthorsNestedInputSchema).optional()
}).strict();

export const BlogAuthorUncheckedUpdateInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogAuthorCreateManyInputSchema: z.ZodType<Prisma.BlogAuthorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string(),
  authorId: z.string()
}).strict();

export const BlogAuthorUpdateManyMutationInputSchema: z.ZodType<Prisma.BlogAuthorUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogAuthorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PollOptionCreateInputSchema: z.ZodType<Prisma.PollOptionCreateInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  poll: z.lazy(() => PollCreateNestedOneWithoutOptionsInputSchema),
  votes: z.lazy(() => VoteCreateNestedManyWithoutPollOptionInputSchema).optional()
}).strict();

export const PollOptionUncheckedCreateInputSchema: z.ZodType<Prisma.PollOptionUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  pollId: z.string(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPollOptionInputSchema).optional()
}).strict();

export const PollOptionUpdateInputSchema: z.ZodType<Prisma.PollOptionUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  poll: z.lazy(() => PollUpdateOneRequiredWithoutOptionsNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutPollOptionNestedInputSchema).optional()
}).strict();

export const PollOptionUncheckedUpdateInputSchema: z.ZodType<Prisma.PollOptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutPollOptionNestedInputSchema).optional()
}).strict();

export const PollOptionCreateManyInputSchema: z.ZodType<Prisma.PollOptionCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  pollId: z.string()
}).strict();

export const PollOptionUpdateManyMutationInputSchema: z.ZodType<Prisma.PollOptionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PollOptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PollOptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthorCreateInputSchema: z.ZodType<Prisma.AuthorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutAuthorInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuthorsInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorUncheckedCreateInputSchema: z.ZodType<Prisma.AuthorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorUpdateInputSchema: z.ZodType<Prisma.AuthorUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutAuthorNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAuthorsNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const AuthorUncheckedUpdateInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const AuthorCreateManyInputSchema: z.ZodType<Prisma.AuthorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  userId: z.string().optional().nullable()
}).strict();

export const AuthorUpdateManyMutationInputSchema: z.ZodType<Prisma.AuthorUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuthorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaCreateInputSchema: z.ZodType<Prisma.SocialMediaCreateInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSocialMediaInputSchema).optional(),
  author: z.lazy(() => AuthorCreateNestedOneWithoutSocialMediaInputSchema).optional()
}).strict();

export const SocialMediaUncheckedCreateInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable()
}).strict();

export const SocialMediaUpdateInputSchema: z.ZodType<Prisma.SocialMediaUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutSocialMediaNestedInputSchema).optional(),
  author: z.lazy(() => AuthorUpdateOneWithoutSocialMediaNestedInputSchema).optional()
}).strict();

export const SocialMediaUncheckedUpdateInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaCreateManyInputSchema: z.ZodType<Prisma.SocialMediaCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable()
}).strict();

export const SocialMediaUpdateManyMutationInputSchema: z.ZodType<Prisma.SocialMediaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SocialMediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImageCreateInputSchema: z.ZodType<Prisma.ImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutImageInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutImageInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutImageInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutImageInputSchema).optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUncheckedCreateInputSchema: z.ZodType<Prisma.ImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUpdateInputSchema: z.ZodType<Prisma.ImageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutImageNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutImageNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutImageNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutImageNestedInputSchema).optional(),
  poll: z.lazy(() => PollUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageCreateManyInputSchema: z.ZodType<Prisma.ImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable()
}).strict();

export const ImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ImageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const VoteListRelationFilterSchema: z.ZodType<Prisma.VoteListRelationFilter> = z.object({
  every: z.lazy(() => VoteWhereInputSchema).optional(),
  some: z.lazy(() => VoteWhereInputSchema).optional(),
  none: z.lazy(() => VoteWhereInputSchema).optional()
}).strict();

export const InfoNullableScalarRelationFilterSchema: z.ZodType<Prisma.InfoNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => InfoWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InfoWhereInputSchema).optional().nullable()
}).strict();

export const BlogLikeListRelationFilterSchema: z.ZodType<Prisma.BlogLikeListRelationFilter> = z.object({
  every: z.lazy(() => BlogLikeWhereInputSchema).optional(),
  some: z.lazy(() => BlogLikeWhereInputSchema).optional(),
  none: z.lazy(() => BlogLikeWhereInputSchema).optional()
}).strict();

export const AuthorListRelationFilterSchema: z.ZodType<Prisma.AuthorListRelationFilter> = z.object({
  every: z.lazy(() => AuthorWhereInputSchema).optional(),
  some: z.lazy(() => AuthorWhereInputSchema).optional(),
  none: z.lazy(() => AuthorWhereInputSchema).optional()
}).strict();

export const ImageListRelationFilterSchema: z.ZodType<Prisma.ImageListRelationFilter> = z.object({
  every: z.lazy(() => ImageWhereInputSchema).optional(),
  some: z.lazy(() => ImageWhereInputSchema).optional(),
  none: z.lazy(() => ImageWhereInputSchema).optional()
}).strict();

export const SocialMediaListRelationFilterSchema: z.ZodType<Prisma.SocialMediaListRelationFilter> = z.object({
  every: z.lazy(() => SocialMediaWhereInputSchema).optional(),
  some: z.lazy(() => SocialMediaWhereInputSchema).optional(),
  none: z.lazy(() => SocialMediaWhereInputSchema).optional()
}).strict();

export const ReadingHistoryListRelationFilterSchema: z.ZodType<Prisma.ReadingHistoryListRelationFilter> = z.object({
  every: z.lazy(() => ReadingHistoryWhereInputSchema).optional(),
  some: z.lazy(() => ReadingHistoryWhereInputSchema).optional(),
  none: z.lazy(() => ReadingHistoryWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogLikeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BlogLikeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuthorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SocialMediaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SocialMediaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReadingHistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReadingHistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  cloudinaryImageId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  interests: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  cloudinaryImageId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  cloudinaryImageId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ReadingHistoryUserIdArticleIdCompoundUniqueInputSchema: z.ZodType<Prisma.ReadingHistoryUserIdArticleIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  articleId: z.string()
}).strict();

export const ReadingHistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReadingHistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  readAt: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReadingHistoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReadingHistoryAvgOrderByAggregateInput> = z.object({
  readTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReadingHistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReadingHistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  readAt: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReadingHistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReadingHistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  readAt: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReadingHistorySumOrderByAggregateInputSchema: z.ZodType<Prisma.ReadingHistorySumOrderByAggregateInput> = z.object({
  readTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const InfoCountOrderByAggregateInputSchema: z.ZodType<Prisma.InfoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InfoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InfoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InfoMinOrderByAggregateInputSchema: z.ZodType<Prisma.InfoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollScalarRelationFilterSchema: z.ZodType<Prisma.PollScalarRelationFilter> = z.object({
  is: z.lazy(() => PollWhereInputSchema).optional(),
  isNot: z.lazy(() => PollWhereInputSchema).optional()
}).strict();

export const PollOptionScalarRelationFilterSchema: z.ZodType<Prisma.PollOptionScalarRelationFilter> = z.object({
  is: z.lazy(() => PollOptionWhereInputSchema).optional(),
  isNot: z.lazy(() => PollOptionWhereInputSchema).optional()
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const VoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.VoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashedIp: z.lazy(() => SortOrderSchema).optional(),
  anonymousId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  pollOptionId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashedIp: z.lazy(() => SortOrderSchema).optional(),
  anonymousId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  pollOptionId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.VoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashedIp: z.lazy(() => SortOrderSchema).optional(),
  anonymousId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  pollOptionId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollListRelationFilterSchema: z.ZodType<Prisma.PollListRelationFilter> = z.object({
  every: z.lazy(() => PollWhereInputSchema).optional(),
  some: z.lazy(() => PollWhereInputSchema).optional(),
  none: z.lazy(() => PollWhereInputSchema).optional()
}).strict();

export const BlogListRelationFilterSchema: z.ZodType<Prisma.BlogListRelationFilter> = z.object({
  every: z.lazy(() => BlogWhereInputSchema).optional(),
  some: z.lazy(() => BlogWhereInputSchema).optional(),
  none: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const PollOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PollOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BlogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollNullableScalarRelationFilterSchema: z.ZodType<Prisma.PollNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PollWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PollWhereInputSchema).optional().nullable()
}).strict();

export const BlogNullableScalarRelationFilterSchema: z.ZodType<Prisma.BlogNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => BlogWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => BlogWhereInputSchema).optional().nullable()
}).strict();

export const NewsItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.NewsItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NewsItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.NewsItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryScalarRelationFilterSchema: z.ZodType<Prisma.CategoryScalarRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const PollOptionListRelationFilterSchema: z.ZodType<Prisma.PollOptionListRelationFilter> = z.object({
  every: z.lazy(() => PollOptionWhereInputSchema).optional(),
  some: z.lazy(() => PollOptionWhereInputSchema).optional(),
  none: z.lazy(() => PollOptionWhereInputSchema).optional()
}).strict();

export const NewsItemNullableScalarRelationFilterSchema: z.ZodType<Prisma.NewsItemNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => NewsItemWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NewsItemWhereInputSchema).optional().nullable()
}).strict();

export const PollOptionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PollOptionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollCountOrderByAggregateInputSchema: z.ZodType<Prisma.PollCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  Archived: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  ArchivedAt: z.lazy(() => SortOrderSchema).optional(),
  Deleted: z.lazy(() => SortOrderSchema).optional(),
  DeletedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PollMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  Archived: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  ArchivedAt: z.lazy(() => SortOrderSchema).optional(),
  Deleted: z.lazy(() => SortOrderSchema).optional(),
  DeletedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollMinOrderByAggregateInputSchema: z.ZodType<Prisma.PollMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  Archived: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  ArchivedAt: z.lazy(() => SortOrderSchema).optional(),
  Deleted: z.lazy(() => SortOrderSchema).optional(),
  DeletedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageNullableScalarRelationFilterSchema: z.ZodType<Prisma.ImageNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ImageWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ImageWhereInputSchema).optional().nullable()
}).strict();

export const BlogAuthorListRelationFilterSchema: z.ZodType<Prisma.BlogAuthorListRelationFilter> = z.object({
  every: z.lazy(() => BlogAuthorWhereInputSchema).optional(),
  some: z.lazy(() => BlogAuthorWhereInputSchema).optional(),
  none: z.lazy(() => BlogAuthorWhereInputSchema).optional()
}).strict();

export const BlogTagListRelationFilterSchema: z.ZodType<Prisma.BlogTagListRelationFilter> = z.object({
  every: z.lazy(() => BlogTagWhereInputSchema).optional(),
  some: z.lazy(() => BlogTagWhereInputSchema).optional(),
  none: z.lazy(() => BlogTagWhereInputSchema).optional()
}).strict();

export const CategoryNullableScalarRelationFilterSchema: z.ZodType<Prisma.CategoryNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional().nullable()
}).strict();

export const BlogAuthorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BlogAuthorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BlogTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogCountOrderByAggregateInputSchema: z.ZodType<Prisma.BlogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  titlePunch: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  imagenSeoId: z.lazy(() => SortOrderSchema).optional(),
  seoDescription: z.lazy(() => SortOrderSchema).optional(),
  dateNews: z.lazy(() => SortOrderSchema).optional(),
  imagenCardId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BlogAvgOrderByAggregateInput> = z.object({
  readTime: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BlogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  titlePunch: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  imagenSeoId: z.lazy(() => SortOrderSchema).optional(),
  seoDescription: z.lazy(() => SortOrderSchema).optional(),
  dateNews: z.lazy(() => SortOrderSchema).optional(),
  imagenCardId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  titlePunch: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  imagenSeoId: z.lazy(() => SortOrderSchema).optional(),
  seoDescription: z.lazy(() => SortOrderSchema).optional(),
  dateNews: z.lazy(() => SortOrderSchema).optional(),
  imagenCardId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional(),
  readTime: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  dateCreated: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogSumOrderByAggregateInputSchema: z.ZodType<Prisma.BlogSumOrderByAggregateInput> = z.object({
  readTime: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogScalarRelationFilterSchema: z.ZodType<Prisma.BlogScalarRelationFilter> = z.object({
  is: z.lazy(() => BlogWhereInputSchema).optional(),
  isNot: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const BlogTagBlogIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.BlogTagBlogIdTagIdCompoundUniqueInput> = z.object({
  blogId: z.string(),
  tagId: z.string()
}).strict();

export const BlogTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.BlogTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BlogTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlogTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogLikeUserIdBlogIdCompoundUniqueInputSchema: z.ZodType<Prisma.BlogLikeUserIdBlogIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  blogId: z.string()
}).strict();

export const BlogLikeCountOrderByAggregateInputSchema: z.ZodType<Prisma.BlogLikeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogLikeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BlogLikeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogLikeMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlogLikeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorScalarRelationFilterSchema: z.ZodType<Prisma.AuthorScalarRelationFilter> = z.object({
  is: z.lazy(() => AuthorWhereInputSchema).optional(),
  isNot: z.lazy(() => AuthorWhereInputSchema).optional()
}).strict();

export const BlogAuthorBlogIdAuthorIdCompoundUniqueInputSchema: z.ZodType<Prisma.BlogAuthorBlogIdAuthorIdCompoundUniqueInput> = z.object({
  blogId: z.string(),
  authorId: z.string()
}).strict();

export const BlogAuthorCountOrderByAggregateInputSchema: z.ZodType<Prisma.BlogAuthorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogAuthorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BlogAuthorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogAuthorMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlogAuthorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollOptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PollOptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollOptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PollOptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PollOptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PollOptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuthorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  twitter: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuthorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  twitter: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuthorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  twitter: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthorNullableScalarRelationFilterSchema: z.ZodType<Prisma.AuthorNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AuthorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AuthorWhereInputSchema).optional().nullable()
}).strict();

export const SocialMediaUserIdPlatformCompoundUniqueInputSchema: z.ZodType<Prisma.SocialMediaUserIdPlatformCompoundUniqueInput> = z.object({
  userId: z.string(),
  platform: z.string()
}).strict();

export const SocialMediaAuthorIdPlatformCompoundUniqueInputSchema: z.ZodType<Prisma.SocialMediaAuthorIdPlatformCompoundUniqueInput> = z.object({
  authorId: z.string(),
  platform: z.string()
}).strict();

export const SocialMediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.SocialMediaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SocialMediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SocialMediaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SocialMediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.SocialMediaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  publicId: z.lazy(() => SortOrderSchema).optional(),
  alt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  publicId: z.lazy(() => SortOrderSchema).optional(),
  alt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  publicId: z.lazy(() => SortOrderSchema).optional(),
  alt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  newsItemId: z.lazy(() => SortOrderSchema).optional(),
  blogId: z.lazy(() => SortOrderSchema).optional(),
  pollId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateinterestsInputSchema: z.ZodType<Prisma.UserCreateinterestsInput> = z.object({
  set: z.string().array()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VoteCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutUserInputSchema),z.lazy(() => VoteCreateWithoutUserInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InfoCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.InfoCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InfoCreateWithoutUserInputSchema),z.lazy(() => InfoUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InfoCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => InfoWhereUniqueInputSchema).optional()
}).strict();

export const BlogLikeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutUserInputSchema),z.lazy(() => BlogLikeCreateWithoutUserInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuthorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthorCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutUserInputSchema),z.lazy(() => AuthorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutUserInputSchema),z.lazy(() => ImageCreateWithoutUserInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaCreateWithoutUserInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReadingHistoryCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema).array(),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReadingHistoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VoteUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutUserInputSchema),z.lazy(() => VoteCreateWithoutUserInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InfoUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.InfoUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InfoCreateWithoutUserInputSchema),z.lazy(() => InfoUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InfoCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => InfoWhereUniqueInputSchema).optional()
}).strict();

export const BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutUserInputSchema),z.lazy(() => BlogLikeCreateWithoutUserInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuthorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthorUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutUserInputSchema),z.lazy(() => AuthorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutUserInputSchema),z.lazy(() => ImageCreateWithoutUserInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaCreateWithoutUserInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema).array(),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReadingHistoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateinterestsInputSchema: z.ZodType<Prisma.UserUpdateinterestsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VoteUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutUserInputSchema),z.lazy(() => VoteCreateWithoutUserInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InfoUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.InfoUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InfoCreateWithoutUserInputSchema),z.lazy(() => InfoUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InfoCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => InfoUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InfoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InfoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InfoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InfoUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => InfoUpdateWithoutUserInputSchema),z.lazy(() => InfoUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const BlogLikeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BlogLikeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutUserInputSchema),z.lazy(() => BlogLikeCreateWithoutUserInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogLikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BlogLikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogLikeScalarWhereInputSchema),z.lazy(() => BlogLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuthorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthorUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutUserInputSchema),z.lazy(() => AuthorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AuthorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthorScalarWhereInputSchema),z.lazy(() => AuthorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutUserInputSchema),z.lazy(() => ImageCreateWithoutUserInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SocialMediaUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaCreateWithoutUserInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SocialMediaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SocialMediaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SocialMediaScalarWhereInputSchema),z.lazy(() => SocialMediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReadingHistoryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReadingHistoryUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema).array(),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReadingHistoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReadingHistoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReadingHistoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReadingHistoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReadingHistoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReadingHistoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReadingHistoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReadingHistoryScalarWhereInputSchema),z.lazy(() => ReadingHistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutUserInputSchema),z.lazy(() => VoteCreateWithoutUserInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => VoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InfoUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.InfoUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InfoCreateWithoutUserInputSchema),z.lazy(() => InfoUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InfoCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => InfoUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InfoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InfoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InfoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InfoUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => InfoUpdateWithoutUserInputSchema),z.lazy(() => InfoUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutUserInputSchema),z.lazy(() => BlogLikeCreateWithoutUserInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogLikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BlogLikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogLikeScalarWhereInputSchema),z.lazy(() => BlogLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuthorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutUserInputSchema),z.lazy(() => AuthorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthorWhereUniqueInputSchema),z.lazy(() => AuthorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AuthorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthorScalarWhereInputSchema),z.lazy(() => AuthorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutUserInputSchema),z.lazy(() => ImageCreateWithoutUserInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaCreateWithoutUserInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SocialMediaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SocialMediaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SocialMediaScalarWhereInputSchema),z.lazy(() => SocialMediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema).array(),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReadingHistoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReadingHistoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReadingHistoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReadingHistoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReadingHistoryWhereUniqueInputSchema),z.lazy(() => ReadingHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReadingHistoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReadingHistoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReadingHistoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReadingHistoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReadingHistoryScalarWhereInputSchema),z.lazy(() => ReadingHistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReadingHistoryInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReadingHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutReadingHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReadingHistoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutReadingHistoryNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReadingHistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReadingHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutReadingHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReadingHistoryInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReadingHistoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReadingHistoryInputSchema),z.lazy(() => UserUpdateWithoutReadingHistoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReadingHistoryInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutInfoInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInfoInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInfoInputSchema),z.lazy(() => UserUncheckedCreateWithoutInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInfoInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutInfoNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInfoInputSchema),z.lazy(() => UserUncheckedCreateWithoutInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInfoInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInfoInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInfoInputSchema),z.lazy(() => UserUpdateWithoutInfoInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInfoInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const PollCreateNestedOneWithoutVoteInputSchema: z.ZodType<Prisma.PollCreateNestedOneWithoutVoteInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutVoteInputSchema),z.lazy(() => PollUncheckedCreateWithoutVoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutVoteInputSchema).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional()
}).strict();

export const PollOptionCreateNestedOneWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionCreateNestedOneWithoutVotesInput> = z.object({
  create: z.union([ z.lazy(() => PollOptionCreateWithoutVotesInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollOptionCreateOrConnectWithoutVotesInputSchema).optional(),
  connect: z.lazy(() => PollOptionWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutVotesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVotesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PollUpdateOneRequiredWithoutVoteNestedInputSchema: z.ZodType<Prisma.PollUpdateOneRequiredWithoutVoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutVoteInputSchema),z.lazy(() => PollUncheckedCreateWithoutVoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutVoteInputSchema).optional(),
  upsert: z.lazy(() => PollUpsertWithoutVoteInputSchema).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PollUpdateToOneWithWhereWithoutVoteInputSchema),z.lazy(() => PollUpdateWithoutVoteInputSchema),z.lazy(() => PollUncheckedUpdateWithoutVoteInputSchema) ]).optional(),
}).strict();

export const PollOptionUpdateOneRequiredWithoutVotesNestedInputSchema: z.ZodType<Prisma.PollOptionUpdateOneRequiredWithoutVotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollOptionCreateWithoutVotesInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollOptionCreateOrConnectWithoutVotesInputSchema).optional(),
  upsert: z.lazy(() => PollOptionUpsertWithoutVotesInputSchema).optional(),
  connect: z.lazy(() => PollOptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PollOptionUpdateToOneWithWhereWithoutVotesInputSchema),z.lazy(() => PollOptionUpdateWithoutVotesInputSchema),z.lazy(() => PollOptionUncheckedUpdateWithoutVotesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutVotesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutVotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVotesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVotesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVotesInputSchema),z.lazy(() => UserUpdateWithoutVotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVotesInputSchema) ]).optional(),
}).strict();

export const PollCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.PollCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutCategoryInputSchema),z.lazy(() => PollCreateWithoutCategoryInputSchema).array(),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCategoryInputSchema),z.lazy(() => ImageCreateWithoutCategoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.BlogCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutCategoryInputSchema),z.lazy(() => BlogCreateWithoutCategoryInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PollUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.PollUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutCategoryInputSchema),z.lazy(() => PollCreateWithoutCategoryInputSchema).array(),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCategoryInputSchema),z.lazy(() => ImageCreateWithoutCategoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutCategoryInputSchema),z.lazy(() => BlogCreateWithoutCategoryInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PollUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.PollUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutCategoryInputSchema),z.lazy(() => PollCreateWithoutCategoryInputSchema).array(),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PollUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => PollUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PollUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => PollUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PollUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => PollUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PollScalarWhereInputSchema),z.lazy(() => PollScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCategoryInputSchema),z.lazy(() => ImageCreateWithoutCategoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.BlogUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutCategoryInputSchema),z.lazy(() => BlogCreateWithoutCategoryInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PollUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.PollUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutCategoryInputSchema),z.lazy(() => PollCreateWithoutCategoryInputSchema).array(),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => PollCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PollUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => PollUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PollWhereUniqueInputSchema),z.lazy(() => PollWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PollUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => PollUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PollUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => PollUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PollScalarWhereInputSchema),z.lazy(() => PollScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCategoryInputSchema),z.lazy(() => ImageCreateWithoutCategoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutCategoryInputSchema),z.lazy(() => BlogCreateWithoutCategoryInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => BlogCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PollCreateNestedOneWithoutNewsItemInputSchema: z.ZodType<Prisma.PollCreateNestedOneWithoutNewsItemInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutNewsItemInputSchema).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional()
}).strict();

export const BlogCreateNestedOneWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogCreateNestedOneWithoutNewsItemInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutNewsItemInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional()
}).strict();

export const ImageCreateNestedManyWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutNewsItemInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutNewsItemInputSchema),z.lazy(() => ImageCreateWithoutNewsItemInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema),z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyNewsItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PollUncheckedCreateNestedOneWithoutNewsItemInputSchema: z.ZodType<Prisma.PollUncheckedCreateNestedOneWithoutNewsItemInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutNewsItemInputSchema).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional()
}).strict();

export const BlogUncheckedCreateNestedOneWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogUncheckedCreateNestedOneWithoutNewsItemInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutNewsItemInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional()
}).strict();

export const ImageUncheckedCreateNestedManyWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutNewsItemInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutNewsItemInputSchema),z.lazy(() => ImageCreateWithoutNewsItemInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema),z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyNewsItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PollUpdateOneWithoutNewsItemNestedInputSchema: z.ZodType<Prisma.PollUpdateOneWithoutNewsItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutNewsItemInputSchema).optional(),
  upsert: z.lazy(() => PollUpsertWithoutNewsItemInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PollWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PollWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PollUpdateToOneWithWhereWithoutNewsItemInputSchema),z.lazy(() => PollUpdateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedUpdateWithoutNewsItemInputSchema) ]).optional(),
}).strict();

export const BlogUpdateOneWithoutNewsItemNestedInputSchema: z.ZodType<Prisma.BlogUpdateOneWithoutNewsItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutNewsItemInputSchema).optional(),
  upsert: z.lazy(() => BlogUpsertWithoutNewsItemInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BlogUpdateToOneWithWhereWithoutNewsItemInputSchema),z.lazy(() => BlogUpdateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutNewsItemInputSchema) ]).optional(),
}).strict();

export const ImageUpdateManyWithoutNewsItemNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutNewsItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutNewsItemInputSchema),z.lazy(() => ImageCreateWithoutNewsItemInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema),z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutNewsItemInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutNewsItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyNewsItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutNewsItemInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutNewsItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutNewsItemInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutNewsItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PollUncheckedUpdateOneWithoutNewsItemNestedInputSchema: z.ZodType<Prisma.PollUncheckedUpdateOneWithoutNewsItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutNewsItemInputSchema).optional(),
  upsert: z.lazy(() => PollUpsertWithoutNewsItemInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PollWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PollWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PollUpdateToOneWithWhereWithoutNewsItemInputSchema),z.lazy(() => PollUpdateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedUpdateWithoutNewsItemInputSchema) ]).optional(),
}).strict();

export const BlogUncheckedUpdateOneWithoutNewsItemNestedInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateOneWithoutNewsItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedCreateWithoutNewsItemInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutNewsItemInputSchema).optional(),
  upsert: z.lazy(() => BlogUpsertWithoutNewsItemInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BlogUpdateToOneWithWhereWithoutNewsItemInputSchema),z.lazy(() => BlogUpdateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutNewsItemInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutNewsItemNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutNewsItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutNewsItemInputSchema),z.lazy(() => ImageCreateWithoutNewsItemInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema),z.lazy(() => ImageCreateOrConnectWithoutNewsItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutNewsItemInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutNewsItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyNewsItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutNewsItemInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutNewsItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutNewsItemInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutNewsItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedOneWithoutPollsInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutPollsInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutPollsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPollsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutPollsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const PollOptionCreateNestedManyWithoutPollInputSchema: z.ZodType<Prisma.PollOptionCreateNestedManyWithoutPollInput> = z.object({
  create: z.union([ z.lazy(() => PollOptionCreateWithoutPollInputSchema),z.lazy(() => PollOptionCreateWithoutPollInputSchema).array(),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema),z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollOptionCreateManyPollInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteCreateNestedManyWithoutPollInputSchema: z.ZodType<Prisma.VoteCreateNestedManyWithoutPollInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollInputSchema),z.lazy(() => VoteCreateWithoutPollInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsItemCreateNestedOneWithoutPollInputSchema: z.ZodType<Prisma.NewsItemCreateNestedOneWithoutPollInput> = z.object({
  create: z.union([ z.lazy(() => NewsItemCreateWithoutPollInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutPollInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsItemCreateOrConnectWithoutPollInputSchema).optional(),
  connect: z.lazy(() => NewsItemWhereUniqueInputSchema).optional()
}).strict();

export const ImageCreateNestedManyWithoutPollInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutPollInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPollInputSchema),z.lazy(() => ImageCreateWithoutPollInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPollInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PollOptionUncheckedCreateNestedManyWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUncheckedCreateNestedManyWithoutPollInput> = z.object({
  create: z.union([ z.lazy(() => PollOptionCreateWithoutPollInputSchema),z.lazy(() => PollOptionCreateWithoutPollInputSchema).array(),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema),z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollOptionCreateManyPollInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedCreateNestedManyWithoutPollInputSchema: z.ZodType<Prisma.VoteUncheckedCreateNestedManyWithoutPollInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollInputSchema),z.lazy(() => VoteCreateWithoutPollInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutPollInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutPollInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPollInputSchema),z.lazy(() => ImageCreateWithoutPollInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPollInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryUpdateOneRequiredWithoutPollsNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutPollsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutPollsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPollsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutPollsInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutPollsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutPollsInputSchema),z.lazy(() => CategoryUpdateWithoutPollsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutPollsInputSchema) ]).optional(),
}).strict();

export const PollOptionUpdateManyWithoutPollNestedInputSchema: z.ZodType<Prisma.PollOptionUpdateManyWithoutPollNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollOptionCreateWithoutPollInputSchema),z.lazy(() => PollOptionCreateWithoutPollInputSchema).array(),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema),z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PollOptionUpsertWithWhereUniqueWithoutPollInputSchema),z.lazy(() => PollOptionUpsertWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollOptionCreateManyPollInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PollOptionUpdateWithWhereUniqueWithoutPollInputSchema),z.lazy(() => PollOptionUpdateWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PollOptionUpdateManyWithWhereWithoutPollInputSchema),z.lazy(() => PollOptionUpdateManyWithWhereWithoutPollInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PollOptionScalarWhereInputSchema),z.lazy(() => PollOptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUpdateManyWithoutPollNestedInputSchema: z.ZodType<Prisma.VoteUpdateManyWithoutPollNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollInputSchema),z.lazy(() => VoteCreateWithoutPollInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutPollInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutPollInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsItemUpdateOneWithoutPollNestedInputSchema: z.ZodType<Prisma.NewsItemUpdateOneWithoutPollNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsItemCreateWithoutPollInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutPollInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsItemCreateOrConnectWithoutPollInputSchema).optional(),
  upsert: z.lazy(() => NewsItemUpsertWithoutPollInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NewsItemWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NewsItemWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NewsItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NewsItemUpdateToOneWithWhereWithoutPollInputSchema),z.lazy(() => NewsItemUpdateWithoutPollInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutPollInputSchema) ]).optional(),
}).strict();

export const ImageUpdateManyWithoutPollNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutPollNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPollInputSchema),z.lazy(() => ImageCreateWithoutPollInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutPollInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPollInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutPollInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutPollInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutPollInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PollOptionUncheckedUpdateManyWithoutPollNestedInputSchema: z.ZodType<Prisma.PollOptionUncheckedUpdateManyWithoutPollNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollOptionCreateWithoutPollInputSchema),z.lazy(() => PollOptionCreateWithoutPollInputSchema).array(),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema),z.lazy(() => PollOptionCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PollOptionUpsertWithWhereUniqueWithoutPollInputSchema),z.lazy(() => PollOptionUpsertWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PollOptionCreateManyPollInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PollOptionWhereUniqueInputSchema),z.lazy(() => PollOptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PollOptionUpdateWithWhereUniqueWithoutPollInputSchema),z.lazy(() => PollOptionUpdateWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PollOptionUpdateManyWithWhereWithoutPollInputSchema),z.lazy(() => PollOptionUpdateManyWithWhereWithoutPollInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PollOptionScalarWhereInputSchema),z.lazy(() => PollOptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutPollNestedInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutPollNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollInputSchema),z.lazy(() => VoteCreateWithoutPollInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutPollInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutPollInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutPollNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutPollNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPollInputSchema),z.lazy(() => ImageCreateWithoutPollInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPollInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutPollInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPollInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutPollInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutPollInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutPollInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutPollInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedOneWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageCreateNestedOneWithoutBlogImagenSeoInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenSeoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ImageCreateOrConnectWithoutBlogImagenSeoInputSchema).optional(),
  connect: z.lazy(() => ImageWhereUniqueInputSchema).optional()
}).strict();

export const ImageCreateNestedOneWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageCreateNestedOneWithoutBlogImagenCardInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenCardInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ImageCreateOrConnectWithoutBlogImagenCardInputSchema).optional(),
  connect: z.lazy(() => ImageWhereUniqueInputSchema).optional()
}).strict();

export const NewsItemCreateNestedOneWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemCreateNestedOneWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => NewsItemCreateWithoutBlogInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsItemCreateOrConnectWithoutBlogInputSchema).optional(),
  connect: z.lazy(() => NewsItemWhereUniqueInputSchema).optional()
}).strict();

export const ImageCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogInputSchema),z.lazy(() => ImageCreateWithoutBlogInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema),z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogLikeCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogTagCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutBlogInputSchema),z.lazy(() => BlogTagCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedOneWithoutBlogInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutBlogInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutBlogInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const ImageUncheckedCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogInputSchema),z.lazy(() => ImageCreateWithoutBlogInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema),z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUncheckedCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUncheckedCreateNestedManyWithoutBlogInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutBlogInputSchema),z.lazy(() => BlogTagCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema: z.ZodType<Prisma.ImageUpdateOneWithoutBlogImagenSeoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenSeoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ImageCreateOrConnectWithoutBlogImagenSeoInputSchema).optional(),
  upsert: z.lazy(() => ImageUpsertWithoutBlogImagenSeoInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ImageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ImageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ImageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ImageUpdateToOneWithWhereWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUpdateWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogImagenSeoInputSchema) ]).optional(),
}).strict();

export const ImageUpdateOneWithoutBlogImagenCardNestedInputSchema: z.ZodType<Prisma.ImageUpdateOneWithoutBlogImagenCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenCardInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ImageCreateOrConnectWithoutBlogImagenCardInputSchema).optional(),
  upsert: z.lazy(() => ImageUpsertWithoutBlogImagenCardInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ImageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ImageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ImageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ImageUpdateToOneWithWhereWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUpdateWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogImagenCardInputSchema) ]).optional(),
}).strict();

export const NewsItemUpdateOneWithoutBlogNestedInputSchema: z.ZodType<Prisma.NewsItemUpdateOneWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsItemCreateWithoutBlogInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsItemCreateOrConnectWithoutBlogInputSchema).optional(),
  upsert: z.lazy(() => NewsItemUpsertWithoutBlogInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NewsItemWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NewsItemWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NewsItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NewsItemUpdateToOneWithWhereWithoutBlogInputSchema),z.lazy(() => NewsItemUpdateWithoutBlogInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutBlogInputSchema) ]).optional(),
}).strict();

export const ImageUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogInputSchema),z.lazy(() => ImageCreateWithoutBlogInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema),z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.BlogAuthorUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogAuthorScalarWhereInputSchema),z.lazy(() => BlogAuthorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogLikeUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.BlogLikeUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogLikeUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => BlogLikeUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogLikeScalarWhereInputSchema),z.lazy(() => BlogLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogTagUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.BlogTagUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutBlogInputSchema),z.lazy(() => BlogTagCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogTagUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => BlogTagUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogTagScalarWhereInputSchema),z.lazy(() => BlogTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryUpdateOneWithoutBlogNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutBlogInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutBlogInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutBlogInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutBlogInputSchema),z.lazy(() => CategoryUpdateWithoutBlogInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutBlogInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogInputSchema),z.lazy(() => ImageCreateWithoutBlogInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema),z.lazy(() => ImageCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogAuthorScalarWhereInputSchema),z.lazy(() => BlogAuthorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogLikeCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogLikeUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogLikeCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogLikeWhereUniqueInputSchema),z.lazy(() => BlogLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogLikeUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogLikeUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => BlogLikeUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogLikeScalarWhereInputSchema),z.lazy(() => BlogLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateManyWithoutBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutBlogInputSchema),z.lazy(() => BlogTagCreateWithoutBlogInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutBlogInputSchema),z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogTagUpdateManyWithWhereWithoutBlogInputSchema),z.lazy(() => BlogTagUpdateManyWithWhereWithoutBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogTagScalarWhereInputSchema),z.lazy(() => BlogTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.BlogTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutTagInputSchema),z.lazy(() => BlogTagCreateWithoutTagInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutTagInputSchema),z.lazy(() => BlogTagCreateWithoutTagInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.BlogTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutTagInputSchema),z.lazy(() => BlogTagCreateWithoutTagInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => BlogTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogTagScalarWhereInputSchema),z.lazy(() => BlogTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogTagCreateWithoutTagInputSchema),z.lazy(() => BlogTagCreateWithoutTagInputSchema).array(),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => BlogTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => BlogTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogTagWhereUniqueInputSchema),z.lazy(() => BlogTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => BlogTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => BlogTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogTagScalarWhereInputSchema),z.lazy(() => BlogTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.BlogCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutTagsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedOneWithoutBlogsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutBlogsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutBlogsInputSchema),z.lazy(() => TagUncheckedCreateWithoutBlogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutBlogsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const BlogUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.BlogUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutTagsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => BlogUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BlogUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => BlogUpdateWithoutTagsInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const TagUpdateOneRequiredWithoutBlogsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutBlogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutBlogsInputSchema),z.lazy(() => TagUncheckedCreateWithoutBlogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutBlogsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutBlogsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutBlogsInputSchema),z.lazy(() => TagUpdateWithoutBlogsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutBlogsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBlogLikesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlogLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBlogLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BlogCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.BlogCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutLikesInputSchema),z.lazy(() => BlogUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutBlogLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBlogLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlogLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBlogLikesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBlogLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBlogLikesInputSchema),z.lazy(() => UserUpdateWithoutBlogLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlogLikesInputSchema) ]).optional(),
}).strict();

export const BlogUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.BlogUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutLikesInputSchema),z.lazy(() => BlogUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => BlogUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BlogUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => BlogUpdateWithoutLikesInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const BlogCreateNestedOneWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogCreateNestedOneWithoutBlogAuthorsInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutBlogAuthorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutBlogAuthorsInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional()
}).strict();

export const AuthorCreateNestedOneWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorCreateNestedOneWithoutBlogAuthorsInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBlogAuthorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthorCreateOrConnectWithoutBlogAuthorsInputSchema).optional(),
  connect: z.lazy(() => AuthorWhereUniqueInputSchema).optional()
}).strict();

export const BlogUpdateOneRequiredWithoutBlogAuthorsNestedInputSchema: z.ZodType<Prisma.BlogUpdateOneRequiredWithoutBlogAuthorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutBlogAuthorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutBlogAuthorsInputSchema).optional(),
  upsert: z.lazy(() => BlogUpsertWithoutBlogAuthorsInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BlogUpdateToOneWithWhereWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUpdateWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutBlogAuthorsInputSchema) ]).optional(),
}).strict();

export const AuthorUpdateOneRequiredWithoutBlogAuthorsNestedInputSchema: z.ZodType<Prisma.AuthorUpdateOneRequiredWithoutBlogAuthorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBlogAuthorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthorCreateOrConnectWithoutBlogAuthorsInputSchema).optional(),
  upsert: z.lazy(() => AuthorUpsertWithoutBlogAuthorsInputSchema).optional(),
  connect: z.lazy(() => AuthorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AuthorUpdateToOneWithWhereWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUpdateWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutBlogAuthorsInputSchema) ]).optional(),
}).strict();

export const PollCreateNestedOneWithoutOptionsInputSchema: z.ZodType<Prisma.PollCreateNestedOneWithoutOptionsInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutOptionsInputSchema),z.lazy(() => PollUncheckedCreateWithoutOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutOptionsInputSchema).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional()
}).strict();

export const VoteCreateNestedManyWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteCreateNestedManyWithoutPollOptionInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollOptionInputSchema),z.lazy(() => VoteCreateWithoutPollOptionInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedCreateNestedManyWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUncheckedCreateNestedManyWithoutPollOptionInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollOptionInputSchema),z.lazy(() => VoteCreateWithoutPollOptionInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PollUpdateOneRequiredWithoutOptionsNestedInputSchema: z.ZodType<Prisma.PollUpdateOneRequiredWithoutOptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutOptionsInputSchema),z.lazy(() => PollUncheckedCreateWithoutOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutOptionsInputSchema).optional(),
  upsert: z.lazy(() => PollUpsertWithoutOptionsInputSchema).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PollUpdateToOneWithWhereWithoutOptionsInputSchema),z.lazy(() => PollUpdateWithoutOptionsInputSchema),z.lazy(() => PollUncheckedUpdateWithoutOptionsInputSchema) ]).optional(),
}).strict();

export const VoteUpdateManyWithoutPollOptionNestedInputSchema: z.ZodType<Prisma.VoteUpdateManyWithoutPollOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollOptionInputSchema),z.lazy(() => VoteCreateWithoutPollOptionInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollOptionInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollOptionInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutPollOptionInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutPollOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutPollOptionNestedInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutPollOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => VoteCreateWithoutPollOptionInputSchema),z.lazy(() => VoteCreateWithoutPollOptionInputSchema).array(),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema),z.lazy(() => VoteCreateOrConnectWithoutPollOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollOptionInputSchema),z.lazy(() => VoteUpsertWithWhereUniqueWithoutPollOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VoteCreateManyPollOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VoteWhereUniqueInputSchema),z.lazy(() => VoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollOptionInputSchema),z.lazy(() => VoteUpdateWithWhereUniqueWithoutPollOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VoteUpdateManyWithWhereWithoutPollOptionInputSchema),z.lazy(() => VoteUpdateManyWithWhereWithoutPollOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAuthorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthorsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SocialMediaCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BlogAuthorUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogAuthorScalarWhereInputSchema),z.lazy(() => BlogAuthorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutAuthorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutAuthorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthorsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuthorsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuthorsInputSchema),z.lazy(() => UserUpdateWithoutAuthorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthorsInputSchema) ]).optional(),
}).strict();

export const SocialMediaUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.SocialMediaUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SocialMediaUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => SocialMediaUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SocialMediaScalarWhereInputSchema),z.lazy(() => SocialMediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogAuthorUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema).array(),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BlogAuthorCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogAuthorCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogAuthorWhereUniqueInputSchema),z.lazy(() => BlogAuthorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogAuthorScalarWhereInputSchema),z.lazy(() => BlogAuthorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema).array(),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SocialMediaCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SocialMediaUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SocialMediaCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SocialMediaWhereUniqueInputSchema),z.lazy(() => SocialMediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SocialMediaUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SocialMediaUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => SocialMediaUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SocialMediaScalarWhereInputSchema),z.lazy(() => SocialMediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSocialMediaInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSocialMediaInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AuthorCreateNestedOneWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorCreateNestedOneWithoutSocialMediaInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutSocialMediaInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutSocialMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthorCreateOrConnectWithoutSocialMediaInputSchema).optional(),
  connect: z.lazy(() => AuthorWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutSocialMediaNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutSocialMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSocialMediaInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSocialMediaInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSocialMediaInputSchema),z.lazy(() => UserUpdateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSocialMediaInputSchema) ]).optional(),
}).strict();

export const AuthorUpdateOneWithoutSocialMediaNestedInputSchema: z.ZodType<Prisma.AuthorUpdateOneWithoutSocialMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthorCreateWithoutSocialMediaInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutSocialMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthorCreateOrConnectWithoutSocialMediaInputSchema).optional(),
  upsert: z.lazy(() => AuthorUpsertWithoutSocialMediaInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AuthorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AuthorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AuthorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AuthorUpdateToOneWithWhereWithoutSocialMediaInputSchema),z.lazy(() => AuthorUpdateWithoutSocialMediaInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutSocialMediaInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutImageInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutImageInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutImageInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutImageInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutImageInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutImageInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutImageInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const NewsItemCreateNestedOneWithoutImageInputSchema: z.ZodType<Prisma.NewsItemCreateNestedOneWithoutImageInput> = z.object({
  create: z.union([ z.lazy(() => NewsItemCreateWithoutImageInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsItemCreateOrConnectWithoutImageInputSchema).optional(),
  connect: z.lazy(() => NewsItemWhereUniqueInputSchema).optional()
}).strict();

export const BlogCreateNestedOneWithoutImageInputSchema: z.ZodType<Prisma.BlogCreateNestedOneWithoutImageInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImageInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutImageInputSchema).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional()
}).strict();

export const PollCreateNestedOneWithoutImageInputSchema: z.ZodType<Prisma.PollCreateNestedOneWithoutImageInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutImageInputSchema),z.lazy(() => PollUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutImageInputSchema).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional()
}).strict();

export const BlogCreateNestedManyWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogCreateNestedManyWithoutImagenSeoInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateWithoutImagenSeoInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenSeoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogCreateNestedManyWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogCreateNestedManyWithoutImagenCardInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenCardInputSchema),z.lazy(() => BlogCreateWithoutImagenCardInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUncheckedCreateNestedManyWithoutImagenSeoInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateWithoutImagenSeoInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenSeoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUncheckedCreateNestedManyWithoutImagenCardInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenCardInputSchema),z.lazy(() => BlogCreateWithoutImagenCardInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutImageNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutImageInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutImageInputSchema),z.lazy(() => UserUpdateWithoutImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutImageInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneWithoutImageNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutImageInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutImageInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutImageInputSchema),z.lazy(() => CategoryUpdateWithoutImageInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutImageInputSchema) ]).optional(),
}).strict();

export const NewsItemUpdateOneWithoutImageNestedInputSchema: z.ZodType<Prisma.NewsItemUpdateOneWithoutImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsItemCreateWithoutImageInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsItemCreateOrConnectWithoutImageInputSchema).optional(),
  upsert: z.lazy(() => NewsItemUpsertWithoutImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NewsItemWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NewsItemWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NewsItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NewsItemUpdateToOneWithWhereWithoutImageInputSchema),z.lazy(() => NewsItemUpdateWithoutImageInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutImageInputSchema) ]).optional(),
}).strict();

export const BlogUpdateOneWithoutImageNestedInputSchema: z.ZodType<Prisma.BlogUpdateOneWithoutImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImageInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlogCreateOrConnectWithoutImageInputSchema).optional(),
  upsert: z.lazy(() => BlogUpsertWithoutImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BlogWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BlogUpdateToOneWithWhereWithoutImageInputSchema),z.lazy(() => BlogUpdateWithoutImageInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutImageInputSchema) ]).optional(),
}).strict();

export const PollUpdateOneWithoutImageNestedInputSchema: z.ZodType<Prisma.PollUpdateOneWithoutImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => PollCreateWithoutImageInputSchema),z.lazy(() => PollUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PollCreateOrConnectWithoutImageInputSchema).optional(),
  upsert: z.lazy(() => PollUpsertWithoutImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PollWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PollWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PollWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PollUpdateToOneWithWhereWithoutImageInputSchema),z.lazy(() => PollUpdateWithoutImageInputSchema),z.lazy(() => PollUncheckedUpdateWithoutImageInputSchema) ]).optional(),
}).strict();

export const BlogUpdateManyWithoutImagenSeoNestedInputSchema: z.ZodType<Prisma.BlogUpdateManyWithoutImagenSeoNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateWithoutImagenSeoInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenSeoInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenSeoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenSeoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenSeoInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenSeoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutImagenSeoInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutImagenSeoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogUpdateManyWithoutImagenCardNestedInputSchema: z.ZodType<Prisma.BlogUpdateManyWithoutImagenCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenCardInputSchema),z.lazy(() => BlogCreateWithoutImagenCardInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenCardInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenCardInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutImagenCardInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutImagenCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutImagenSeoNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateWithoutImagenSeoInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenSeoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenSeoInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenSeoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenSeoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenSeoInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenSeoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutImagenSeoInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutImagenSeoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutImagenCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenCardInputSchema),z.lazy(() => BlogCreateWithoutImagenCardInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema),z.lazy(() => BlogCreateOrConnectWithoutImagenCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenCardInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutImagenCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyImagenCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenCardInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutImagenCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutImagenCardInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutImagenCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VoteCreateWithoutUserInputSchema: z.ZodType<Prisma.VoteCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutVoteInputSchema),
  pollOption: z.lazy(() => PollOptionCreateNestedOneWithoutVotesInputSchema)
}).strict();

export const VoteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VoteUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string(),
  pollOptionId: z.string()
}).strict();

export const VoteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VoteCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VoteCreateWithoutUserInputSchema),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VoteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.VoteCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VoteCreateManyUserInputSchema),z.lazy(() => VoteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InfoCreateWithoutUserInputSchema: z.ZodType<Prisma.InfoCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable()
}).strict();

export const InfoUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.InfoUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable()
}).strict();

export const InfoCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.InfoCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => InfoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InfoCreateWithoutUserInputSchema),z.lazy(() => InfoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BlogLikeCreateWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const BlogLikeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const BlogLikeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BlogLikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BlogLikeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BlogLikeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogLikeCreateManyUserInputSchema),z.lazy(() => BlogLikeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AuthorCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthorCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutAuthorInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthorUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AuthorCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthorCreateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AuthorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AuthorCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AuthorCreateManyUserInputSchema),z.lazy(() => AuthorCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ImageCreateWithoutUserInputSchema: z.ZodType<Prisma.ImageCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutImageInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutImageInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutImageInputSchema).optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutUserInputSchema),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ImageCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyUserInputSchema),z.lazy(() => ImageCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SocialMediaCreateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => AuthorCreateNestedOneWithoutSocialMediaInputSchema).optional()
}).strict();

export const SocialMediaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string().optional().nullable()
}).strict();

export const SocialMediaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SocialMediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SocialMediaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SocialMediaCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SocialMediaCreateManyUserInputSchema),z.lazy(() => SocialMediaCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReadingHistoryCreateWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  articleId: z.string(),
  readAt: z.coerce.date().optional(),
  readTime: z.number().int()
}).strict();

export const ReadingHistoryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  articleId: z.string(),
  readAt: z.coerce.date().optional(),
  readTime: z.number().int()
}).strict();

export const ReadingHistoryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReadingHistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReadingHistoryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReadingHistoryCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReadingHistoryCreateManyUserInputSchema),z.lazy(() => ReadingHistoryCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VoteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VoteUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VoteUpdateWithoutUserInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => VoteCreateWithoutUserInputSchema),z.lazy(() => VoteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VoteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VoteUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateWithoutUserInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const VoteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VoteUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => VoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateManyMutationInputSchema),z.lazy(() => VoteUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const VoteScalarWhereInputSchema: z.ZodType<Prisma.VoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VoteScalarWhereInputSchema),z.lazy(() => VoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedIp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  anonymousId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pollId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pollOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const InfoUpsertWithoutUserInputSchema: z.ZodType<Prisma.InfoUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => InfoUpdateWithoutUserInputSchema),z.lazy(() => InfoUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => InfoCreateWithoutUserInputSchema),z.lazy(() => InfoUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => InfoWhereInputSchema).optional()
}).strict();

export const InfoUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.InfoUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => InfoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InfoUpdateWithoutUserInputSchema),z.lazy(() => InfoUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const InfoUpdateWithoutUserInputSchema: z.ZodType<Prisma.InfoUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InfoUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.InfoUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogLikeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BlogLikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogLikeUpdateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BlogLikeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BlogLikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogLikeUpdateWithoutUserInputSchema),z.lazy(() => BlogLikeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const BlogLikeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BlogLikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogLikeUpdateManyMutationInputSchema),z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const BlogLikeScalarWhereInputSchema: z.ZodType<Prisma.BlogLikeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogLikeScalarWhereInputSchema),z.lazy(() => BlogLikeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogLikeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogLikeScalarWhereInputSchema),z.lazy(() => BlogLikeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuthorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthorUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuthorUpdateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AuthorCreateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AuthorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthorUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuthorUpdateWithoutUserInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AuthorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AuthorUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AuthorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuthorUpdateManyMutationInputSchema),z.lazy(() => AuthorUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AuthorScalarWhereInputSchema: z.ZodType<Prisma.AuthorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuthorScalarWhereInputSchema),z.lazy(() => AuthorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthorScalarWhereInputSchema),z.lazy(() => AuthorScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitter: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  facebook: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutUserInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutUserInputSchema),z.lazy(() => ImageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutUserInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ImageScalarWhereInputSchema: z.ZodType<Prisma.ImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  newsItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blogId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pollId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SocialMediaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SocialMediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SocialMediaUpdateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SocialMediaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SocialMediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SocialMediaUpdateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SocialMediaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SocialMediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SocialMediaUpdateManyMutationInputSchema),z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SocialMediaScalarWhereInputSchema: z.ZodType<Prisma.SocialMediaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SocialMediaScalarWhereInputSchema),z.lazy(() => SocialMediaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SocialMediaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SocialMediaScalarWhereInputSchema),z.lazy(() => SocialMediaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ReadingHistoryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReadingHistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReadingHistoryUpdateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReadingHistoryCreateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReadingHistoryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReadingHistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReadingHistoryUpdateWithoutUserInputSchema),z.lazy(() => ReadingHistoryUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReadingHistoryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReadingHistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReadingHistoryUpdateManyMutationInputSchema),z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ReadingHistoryScalarWhereInputSchema: z.ZodType<Prisma.ReadingHistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReadingHistoryScalarWhereInputSchema),z.lazy(() => ReadingHistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReadingHistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReadingHistoryScalarWhereInputSchema),z.lazy(() => ReadingHistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  readAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  readTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserCreateWithoutReadingHistoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReadingHistoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReadingHistoryInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReadingHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutReadingHistoryInputSchema) ]),
}).strict();

export const UserUpsertWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserUpsertWithoutReadingHistoryInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReadingHistoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReadingHistoryInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReadingHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutReadingHistoryInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReadingHistoryInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReadingHistoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReadingHistoryInputSchema) ]),
}).strict();

export const UserUpdateWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserUpdateWithoutReadingHistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReadingHistoryInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReadingHistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutInfoInputSchema: z.ZodType<Prisma.UserCreateWithoutInfoInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInfoInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInfoInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInfoInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInfoInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInfoInputSchema),z.lazy(() => UserUncheckedCreateWithoutInfoInputSchema) ]),
}).strict();

export const UserUpsertWithoutInfoInputSchema: z.ZodType<Prisma.UserUpsertWithoutInfoInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInfoInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInfoInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInfoInputSchema),z.lazy(() => UserUncheckedCreateWithoutInfoInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInfoInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInfoInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInfoInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInfoInputSchema) ]),
}).strict();

export const UserUpdateWithoutInfoInputSchema: z.ZodType<Prisma.UserUpdateWithoutInfoInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInfoInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInfoInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PollCreateWithoutVoteInputSchema: z.ZodType<Prisma.PollCreateWithoutVoteInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutPollsInputSchema),
  options: z.lazy(() => PollOptionCreateNestedManyWithoutPollInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollUncheckedCreateWithoutVoteInputSchema: z.ZodType<Prisma.PollUncheckedCreateWithoutVoteInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string(),
  newsItemId: z.string().optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollCreateOrConnectWithoutVoteInputSchema: z.ZodType<Prisma.PollCreateOrConnectWithoutVoteInput> = z.object({
  where: z.lazy(() => PollWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PollCreateWithoutVoteInputSchema),z.lazy(() => PollUncheckedCreateWithoutVoteInputSchema) ]),
}).strict();

export const PollOptionCreateWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionCreateWithoutVotesInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  poll: z.lazy(() => PollCreateNestedOneWithoutOptionsInputSchema)
}).strict();

export const PollOptionUncheckedCreateWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionUncheckedCreateWithoutVotesInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  pollId: z.string()
}).strict();

export const PollOptionCreateOrConnectWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionCreateOrConnectWithoutVotesInput> = z.object({
  where: z.lazy(() => PollOptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PollOptionCreateWithoutVotesInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutVotesInputSchema) ]),
}).strict();

export const UserCreateWithoutVotesInputSchema: z.ZodType<Prisma.UserCreateWithoutVotesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutVotesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVotesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutVotesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVotesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]),
}).strict();

export const PollUpsertWithoutVoteInputSchema: z.ZodType<Prisma.PollUpsertWithoutVoteInput> = z.object({
  update: z.union([ z.lazy(() => PollUpdateWithoutVoteInputSchema),z.lazy(() => PollUncheckedUpdateWithoutVoteInputSchema) ]),
  create: z.union([ z.lazy(() => PollCreateWithoutVoteInputSchema),z.lazy(() => PollUncheckedCreateWithoutVoteInputSchema) ]),
  where: z.lazy(() => PollWhereInputSchema).optional()
}).strict();

export const PollUpdateToOneWithWhereWithoutVoteInputSchema: z.ZodType<Prisma.PollUpdateToOneWithWhereWithoutVoteInput> = z.object({
  where: z.lazy(() => PollWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PollUpdateWithoutVoteInputSchema),z.lazy(() => PollUncheckedUpdateWithoutVoteInputSchema) ]),
}).strict();

export const PollUpdateWithoutVoteInputSchema: z.ZodType<Prisma.PollUpdateWithoutVoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutPollsNestedInputSchema).optional(),
  options: z.lazy(() => PollOptionUpdateManyWithoutPollNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollUncheckedUpdateWithoutVoteInputSchema: z.ZodType<Prisma.PollUncheckedUpdateWithoutVoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollOptionUpsertWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionUpsertWithoutVotesInput> = z.object({
  update: z.union([ z.lazy(() => PollOptionUpdateWithoutVotesInputSchema),z.lazy(() => PollOptionUncheckedUpdateWithoutVotesInputSchema) ]),
  create: z.union([ z.lazy(() => PollOptionCreateWithoutVotesInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutVotesInputSchema) ]),
  where: z.lazy(() => PollOptionWhereInputSchema).optional()
}).strict();

export const PollOptionUpdateToOneWithWhereWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionUpdateToOneWithWhereWithoutVotesInput> = z.object({
  where: z.lazy(() => PollOptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PollOptionUpdateWithoutVotesInputSchema),z.lazy(() => PollOptionUncheckedUpdateWithoutVotesInputSchema) ]),
}).strict();

export const PollOptionUpdateWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  poll: z.lazy(() => PollUpdateOneRequiredWithoutOptionsNestedInputSchema).optional()
}).strict();

export const PollOptionUncheckedUpdateWithoutVotesInputSchema: z.ZodType<Prisma.PollOptionUncheckedUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutVotesInputSchema: z.ZodType<Prisma.UserUpsertWithoutVotesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutVotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVotesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutVotesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutVotesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVotesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVotesInputSchema) ]),
}).strict();

export const UserUpdateWithoutVotesInputSchema: z.ZodType<Prisma.UserUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutVotesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVotesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PollCreateWithoutCategoryInputSchema: z.ZodType<Prisma.PollCreateWithoutCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  options: z.lazy(() => PollOptionCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteCreateNestedManyWithoutPollInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.PollUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.PollCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => PollWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PollCreateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const PollCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.PollCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PollCreateManyCategoryInputSchema),z.lazy(() => PollCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ImageCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ImageCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutImageInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutImageInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutImageInputSchema).optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const ImageCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyCategoryInputSchema),z.lazy(() => ImageCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogCreateWithoutCategoryInputSchema: z.ZodType<Prisma.BlogCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const BlogCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.BlogCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogCreateManyCategoryInputSchema),z.lazy(() => BlogCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PollUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.PollUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => PollWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PollUpdateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => PollCreateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const PollUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.PollUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => PollWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PollUpdateWithoutCategoryInputSchema),z.lazy(() => PollUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const PollUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.PollUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => PollScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PollUpdateManyMutationInputSchema),z.lazy(() => PollUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const PollScalarWhereInputSchema: z.ZodType<Prisma.PollScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PollScalarWhereInputSchema),z.lazy(() => PollScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollScalarWhereInputSchema),z.lazy(() => PollScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ArchivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  DeletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  newsItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutCategoryInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const BlogUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogUpdateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const BlogUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateWithoutCategoryInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const BlogUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => BlogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateManyMutationInputSchema),z.lazy(() => BlogUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const BlogScalarWhereInputSchema: z.ZodType<Prisma.BlogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  titlePunch: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imagenSeoId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seoDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateNews: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imagenCardId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  newsItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  readTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dateCreated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PollCreateWithoutNewsItemInputSchema: z.ZodType<Prisma.PollCreateWithoutNewsItemInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutPollsInputSchema),
  options: z.lazy(() => PollOptionCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteCreateNestedManyWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollUncheckedCreateWithoutNewsItemInputSchema: z.ZodType<Prisma.PollUncheckedCreateWithoutNewsItemInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string(),
  options: z.lazy(() => PollOptionUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollCreateOrConnectWithoutNewsItemInputSchema: z.ZodType<Prisma.PollCreateOrConnectWithoutNewsItemInput> = z.object({
  where: z.lazy(() => PollWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PollCreateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedCreateWithoutNewsItemInputSchema) ]),
}).strict();

export const BlogCreateWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogCreateWithoutNewsItemInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutNewsItemInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutNewsItemInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedCreateWithoutNewsItemInputSchema) ]),
}).strict();

export const ImageCreateWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageCreateWithoutNewsItemInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutImageInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutImageInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutImageInputSchema).optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutNewsItemInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageCreateOrConnectWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutNewsItemInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema) ]),
}).strict();

export const ImageCreateManyNewsItemInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyNewsItemInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyNewsItemInputSchema),z.lazy(() => ImageCreateManyNewsItemInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PollUpsertWithoutNewsItemInputSchema: z.ZodType<Prisma.PollUpsertWithoutNewsItemInput> = z.object({
  update: z.union([ z.lazy(() => PollUpdateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedUpdateWithoutNewsItemInputSchema) ]),
  create: z.union([ z.lazy(() => PollCreateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedCreateWithoutNewsItemInputSchema) ]),
  where: z.lazy(() => PollWhereInputSchema).optional()
}).strict();

export const PollUpdateToOneWithWhereWithoutNewsItemInputSchema: z.ZodType<Prisma.PollUpdateToOneWithWhereWithoutNewsItemInput> = z.object({
  where: z.lazy(() => PollWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PollUpdateWithoutNewsItemInputSchema),z.lazy(() => PollUncheckedUpdateWithoutNewsItemInputSchema) ]),
}).strict();

export const PollUpdateWithoutNewsItemInputSchema: z.ZodType<Prisma.PollUpdateWithoutNewsItemInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutPollsNestedInputSchema).optional(),
  options: z.lazy(() => PollOptionUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUpdateManyWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollUncheckedUpdateWithoutNewsItemInputSchema: z.ZodType<Prisma.PollUncheckedUpdateWithoutNewsItemInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.lazy(() => PollOptionUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const BlogUpsertWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogUpsertWithoutNewsItemInput> = z.object({
  update: z.union([ z.lazy(() => BlogUpdateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutNewsItemInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedCreateWithoutNewsItemInputSchema) ]),
  where: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const BlogUpdateToOneWithWhereWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogUpdateToOneWithWhereWithoutNewsItemInput> = z.object({
  where: z.lazy(() => BlogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BlogUpdateWithoutNewsItemInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutNewsItemInputSchema) ]),
}).strict();

export const BlogUpdateWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogUpdateWithoutNewsItemInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutNewsItemInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutNewsItemInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const ImageUpsertWithWhereUniqueWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutNewsItemInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutNewsItemInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedCreateWithoutNewsItemInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutNewsItemInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutNewsItemInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutNewsItemInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutNewsItemInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutNewsItemInputSchema) ]),
}).strict();

export const CategoryCreateWithoutPollsInputSchema: z.ZodType<Prisma.CategoryCreateWithoutPollsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutCategoryInputSchema).optional(),
  Blog: z.lazy(() => BlogCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutPollsInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutPollsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  Blog: z.lazy(() => BlogUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutPollsInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutPollsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutPollsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPollsInputSchema) ]),
}).strict();

export const PollOptionCreateWithoutPollInputSchema: z.ZodType<Prisma.PollOptionCreateWithoutPollInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutPollOptionInputSchema).optional()
}).strict();

export const PollOptionUncheckedCreateWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUncheckedCreateWithoutPollInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPollOptionInputSchema).optional()
}).strict();

export const PollOptionCreateOrConnectWithoutPollInputSchema: z.ZodType<Prisma.PollOptionCreateOrConnectWithoutPollInput> = z.object({
  where: z.lazy(() => PollOptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PollOptionCreateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema) ]),
}).strict();

export const PollOptionCreateManyPollInputEnvelopeSchema: z.ZodType<Prisma.PollOptionCreateManyPollInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PollOptionCreateManyPollInputSchema),z.lazy(() => PollOptionCreateManyPollInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VoteCreateWithoutPollInputSchema: z.ZodType<Prisma.VoteCreateWithoutPollInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollOption: z.lazy(() => PollOptionCreateNestedOneWithoutVotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutVotesInputSchema).optional()
}).strict();

export const VoteUncheckedCreateWithoutPollInputSchema: z.ZodType<Prisma.VoteUncheckedCreateWithoutPollInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollOptionId: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const VoteCreateOrConnectWithoutPollInputSchema: z.ZodType<Prisma.VoteCreateOrConnectWithoutPollInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VoteCreateWithoutPollInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema) ]),
}).strict();

export const VoteCreateManyPollInputEnvelopeSchema: z.ZodType<Prisma.VoteCreateManyPollInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VoteCreateManyPollInputSchema),z.lazy(() => VoteCreateManyPollInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NewsItemCreateWithoutPollInputSchema: z.ZodType<Prisma.NewsItemCreateWithoutPollInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutNewsItemInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemUncheckedCreateWithoutPollInputSchema: z.ZodType<Prisma.NewsItemUncheckedCreateWithoutPollInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  blog: z.lazy(() => BlogUncheckedCreateNestedOneWithoutNewsItemInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemCreateOrConnectWithoutPollInputSchema: z.ZodType<Prisma.NewsItemCreateOrConnectWithoutPollInput> = z.object({
  where: z.lazy(() => NewsItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsItemCreateWithoutPollInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutPollInputSchema) ]),
}).strict();

export const ImageCreateWithoutPollInputSchema: z.ZodType<Prisma.ImageCreateWithoutPollInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutImageInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutImageInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutImageInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutPollInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutPollInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageCreateOrConnectWithoutPollInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutPollInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutPollInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema) ]),
}).strict();

export const ImageCreateManyPollInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyPollInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyPollInputSchema),z.lazy(() => ImageCreateManyPollInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CategoryUpsertWithoutPollsInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutPollsInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutPollsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutPollsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutPollsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPollsInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutPollsInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutPollsInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutPollsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutPollsInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutPollsInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutPollsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Blog: z.lazy(() => BlogUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutPollsInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutPollsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Blog: z.lazy(() => BlogUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const PollOptionUpsertWithWhereUniqueWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUpsertWithWhereUniqueWithoutPollInput> = z.object({
  where: z.lazy(() => PollOptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PollOptionUpdateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedUpdateWithoutPollInputSchema) ]),
  create: z.union([ z.lazy(() => PollOptionCreateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedCreateWithoutPollInputSchema) ]),
}).strict();

export const PollOptionUpdateWithWhereUniqueWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUpdateWithWhereUniqueWithoutPollInput> = z.object({
  where: z.lazy(() => PollOptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PollOptionUpdateWithoutPollInputSchema),z.lazy(() => PollOptionUncheckedUpdateWithoutPollInputSchema) ]),
}).strict();

export const PollOptionUpdateManyWithWhereWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUpdateManyWithWhereWithoutPollInput> = z.object({
  where: z.lazy(() => PollOptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PollOptionUpdateManyMutationInputSchema),z.lazy(() => PollOptionUncheckedUpdateManyWithoutPollInputSchema) ]),
}).strict();

export const PollOptionScalarWhereInputSchema: z.ZodType<Prisma.PollOptionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PollOptionScalarWhereInputSchema),z.lazy(() => PollOptionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PollOptionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PollOptionScalarWhereInputSchema),z.lazy(() => PollOptionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pollId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VoteUpsertWithWhereUniqueWithoutPollInputSchema: z.ZodType<Prisma.VoteUpsertWithWhereUniqueWithoutPollInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VoteUpdateWithoutPollInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutPollInputSchema) ]),
  create: z.union([ z.lazy(() => VoteCreateWithoutPollInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollInputSchema) ]),
}).strict();

export const VoteUpdateWithWhereUniqueWithoutPollInputSchema: z.ZodType<Prisma.VoteUpdateWithWhereUniqueWithoutPollInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateWithoutPollInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutPollInputSchema) ]),
}).strict();

export const VoteUpdateManyWithWhereWithoutPollInputSchema: z.ZodType<Prisma.VoteUpdateManyWithWhereWithoutPollInput> = z.object({
  where: z.lazy(() => VoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateManyMutationInputSchema),z.lazy(() => VoteUncheckedUpdateManyWithoutPollInputSchema) ]),
}).strict();

export const NewsItemUpsertWithoutPollInputSchema: z.ZodType<Prisma.NewsItemUpsertWithoutPollInput> = z.object({
  update: z.union([ z.lazy(() => NewsItemUpdateWithoutPollInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutPollInputSchema) ]),
  create: z.union([ z.lazy(() => NewsItemCreateWithoutPollInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutPollInputSchema) ]),
  where: z.lazy(() => NewsItemWhereInputSchema).optional()
}).strict();

export const NewsItemUpdateToOneWithWhereWithoutPollInputSchema: z.ZodType<Prisma.NewsItemUpdateToOneWithWhereWithoutPollInput> = z.object({
  where: z.lazy(() => NewsItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NewsItemUpdateWithoutPollInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutPollInputSchema) ]),
}).strict();

export const NewsItemUpdateWithoutPollInputSchema: z.ZodType<Prisma.NewsItemUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blog: z.lazy(() => BlogUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const NewsItemUncheckedUpdateWithoutPollInputSchema: z.ZodType<Prisma.NewsItemUncheckedUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blog: z.lazy(() => BlogUncheckedUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const ImageUpsertWithWhereUniqueWithoutPollInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutPollInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutPollInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutPollInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutPollInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPollInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutPollInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutPollInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutPollInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutPollInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutPollInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutPollInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutPollInputSchema) ]),
}).strict();

export const ImageCreateWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageCreateWithoutBlogImagenSeoInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutImageInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutImageInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutImageInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutImageInputSchema).optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutBlogImagenSeoInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable(),
  blogImagenCard: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageCreateOrConnectWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutBlogImagenSeoInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenSeoInputSchema) ]),
}).strict();

export const ImageCreateWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageCreateWithoutBlogImagenCardInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutImageInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutImageInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutImageInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutImageInputSchema).optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogCreateNestedManyWithoutImagenSeoInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutBlogImagenCardInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema).optional()
}).strict();

export const ImageCreateOrConnectWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutBlogImagenCardInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenCardInputSchema) ]),
}).strict();

export const NewsItemCreateWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  poll: z.lazy(() => PollCreateNestedOneWithoutNewsItemInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemUncheckedCreateWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemUncheckedCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  poll: z.lazy(() => PollUncheckedCreateNestedOneWithoutNewsItemInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemCreateOrConnectWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemCreateOrConnectWithoutBlogInput> = z.object({
  where: z.lazy(() => NewsItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsItemCreateWithoutBlogInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const ImageCreateWithoutBlogInputSchema: z.ZodType<Prisma.ImageCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutImageInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutImageInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutImageInputSchema).optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutImageInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutBlogInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenSeoInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedCreateNestedManyWithoutImagenCardInputSchema).optional()
}).strict();

export const ImageCreateOrConnectWithoutBlogInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutBlogInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const ImageCreateManyBlogInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyBlogInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyBlogInputSchema),z.lazy(() => ImageCreateManyBlogInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogAuthorCreateWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  author: z.lazy(() => AuthorCreateNestedOneWithoutBlogAuthorsInputSchema)
}).strict();

export const BlogAuthorUncheckedCreateWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string()
}).strict();

export const BlogAuthorCreateOrConnectWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorCreateOrConnectWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogAuthorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const BlogAuthorCreateManyBlogInputEnvelopeSchema: z.ZodType<Prisma.BlogAuthorCreateManyBlogInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogAuthorCreateManyBlogInputSchema),z.lazy(() => BlogAuthorCreateManyBlogInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogLikeCreateWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBlogLikesInputSchema)
}).strict();

export const BlogLikeUncheckedCreateWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUncheckedCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const BlogLikeCreateOrConnectWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeCreateOrConnectWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogLikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const BlogLikeCreateManyBlogInputEnvelopeSchema: z.ZodType<Prisma.BlogLikeCreateManyBlogInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogLikeCreateManyBlogInputSchema),z.lazy(() => BlogLikeCreateManyBlogInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogTagCreateWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutBlogsInputSchema)
}).strict();

export const BlogTagUncheckedCreateWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUncheckedCreateWithoutBlogInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string()
}).strict();

export const BlogTagCreateOrConnectWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagCreateOrConnectWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogTagCreateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const BlogTagCreateManyBlogInputEnvelopeSchema: z.ZodType<Prisma.BlogTagCreateManyBlogInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogTagCreateManyBlogInputSchema),z.lazy(() => BlogTagCreateManyBlogInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CategoryCreateWithoutBlogInputSchema: z.ZodType<Prisma.CategoryCreateWithoutBlogInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  polls: z.lazy(() => PollCreateNestedManyWithoutCategoryInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutBlogInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutBlogInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  polls: z.lazy(() => PollUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutBlogInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutBlogInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutBlogInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const ImageUpsertWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageUpsertWithoutBlogImagenSeoInput> = z.object({
  update: z.union([ z.lazy(() => ImageUpdateWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogImagenSeoInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenSeoInputSchema) ]),
  where: z.lazy(() => ImageWhereInputSchema).optional()
}).strict();

export const ImageUpdateToOneWithWhereWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageUpdateToOneWithWhereWithoutBlogImagenSeoInput> = z.object({
  where: z.lazy(() => ImageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ImageUpdateWithoutBlogImagenSeoInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogImagenSeoInputSchema) ]),
}).strict();

export const ImageUpdateWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageUpdateWithoutBlogImagenSeoInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutImageNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutImageNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutImageNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutImageNestedInputSchema).optional(),
  poll: z.lazy(() => PollUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutBlogImagenSeoInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutBlogImagenSeoInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenCard: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUpsertWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageUpsertWithoutBlogImagenCardInput> = z.object({
  update: z.union([ z.lazy(() => ImageUpdateWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogImagenCardInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogImagenCardInputSchema) ]),
  where: z.lazy(() => ImageWhereInputSchema).optional()
}).strict();

export const ImageUpdateToOneWithWhereWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageUpdateToOneWithWhereWithoutBlogImagenCardInput> = z.object({
  where: z.lazy(() => ImageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ImageUpdateWithoutBlogImagenCardInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogImagenCardInputSchema) ]),
}).strict();

export const ImageUpdateWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageUpdateWithoutBlogImagenCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutImageNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutImageNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutImageNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutImageNestedInputSchema).optional(),
  poll: z.lazy(() => PollUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogUpdateManyWithoutImagenSeoNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutBlogImagenCardInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutBlogImagenCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema).optional()
}).strict();

export const NewsItemUpsertWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemUpsertWithoutBlogInput> = z.object({
  update: z.union([ z.lazy(() => NewsItemUpdateWithoutBlogInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutBlogInputSchema) ]),
  create: z.union([ z.lazy(() => NewsItemCreateWithoutBlogInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutBlogInputSchema) ]),
  where: z.lazy(() => NewsItemWhereInputSchema).optional()
}).strict();

export const NewsItemUpdateToOneWithWhereWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemUpdateToOneWithWhereWithoutBlogInput> = z.object({
  where: z.lazy(() => NewsItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NewsItemUpdateWithoutBlogInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutBlogInputSchema) ]),
}).strict();

export const NewsItemUpdateWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  poll: z.lazy(() => PollUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const NewsItemUncheckedUpdateWithoutBlogInputSchema: z.ZodType<Prisma.NewsItemUncheckedUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  poll: z.lazy(() => PollUncheckedUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const ImageUpsertWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutBlogInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutBlogInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutBlogInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutBlogInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutBlogInputSchema) ]),
}).strict();

export const BlogAuthorUpsertWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUpsertWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogAuthorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogAuthorUpdateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedUpdateWithoutBlogInputSchema) ]),
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const BlogAuthorUpdateWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUpdateWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogAuthorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogAuthorUpdateWithoutBlogInputSchema),z.lazy(() => BlogAuthorUncheckedUpdateWithoutBlogInputSchema) ]),
}).strict();

export const BlogAuthorUpdateManyWithWhereWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUpdateManyWithWhereWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogAuthorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogAuthorUpdateManyMutationInputSchema),z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogInputSchema) ]),
}).strict();

export const BlogAuthorScalarWhereInputSchema: z.ZodType<Prisma.BlogAuthorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogAuthorScalarWhereInputSchema),z.lazy(() => BlogAuthorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogAuthorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogAuthorScalarWhereInputSchema),z.lazy(() => BlogAuthorScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const BlogLikeUpsertWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUpsertWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogLikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogLikeUpdateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedUpdateWithoutBlogInputSchema) ]),
  create: z.union([ z.lazy(() => BlogLikeCreateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const BlogLikeUpdateWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUpdateWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogLikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogLikeUpdateWithoutBlogInputSchema),z.lazy(() => BlogLikeUncheckedUpdateWithoutBlogInputSchema) ]),
}).strict();

export const BlogLikeUpdateManyWithWhereWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUpdateManyWithWhereWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogLikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogLikeUpdateManyMutationInputSchema),z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogInputSchema) ]),
}).strict();

export const BlogTagUpsertWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUpsertWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogTagUpdateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedUpdateWithoutBlogInputSchema) ]),
  create: z.union([ z.lazy(() => BlogTagCreateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutBlogInputSchema) ]),
}).strict();

export const BlogTagUpdateWithWhereUniqueWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUpdateWithWhereUniqueWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogTagUpdateWithoutBlogInputSchema),z.lazy(() => BlogTagUncheckedUpdateWithoutBlogInputSchema) ]),
}).strict();

export const BlogTagUpdateManyWithWhereWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUpdateManyWithWhereWithoutBlogInput> = z.object({
  where: z.lazy(() => BlogTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogTagUpdateManyMutationInputSchema),z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogInputSchema) ]),
}).strict();

export const BlogTagScalarWhereInputSchema: z.ZodType<Prisma.BlogTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogTagScalarWhereInputSchema),z.lazy(() => BlogTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogTagScalarWhereInputSchema),z.lazy(() => BlogTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CategoryUpsertWithoutBlogInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutBlogInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutBlogInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutBlogInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutBlogInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutBlogInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutBlogInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutBlogInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutBlogInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutBlogInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutBlogInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  polls: z.lazy(() => PollUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutBlogInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  polls: z.lazy(() => PollUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const BlogTagCreateWithoutTagInputSchema: z.ZodType<Prisma.BlogTagCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const BlogTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUncheckedCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string()
}).strict();

export const BlogTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.BlogTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => BlogTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogTagCreateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const BlogTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.BlogTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogTagCreateManyTagInputSchema),z.lazy(() => BlogTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => BlogTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogTagUpdateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => BlogTagCreateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const BlogTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => BlogTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogTagUpdateWithoutTagInputSchema),z.lazy(() => BlogTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const BlogTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => BlogTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogTagUpdateManyMutationInputSchema),z.lazy(() => BlogTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const BlogCreateWithoutTagsInputSchema: z.ZodType<Prisma.BlogCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutTagsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagCreateWithoutBlogsInputSchema: z.ZodType<Prisma.TagCreateWithoutBlogsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const TagUncheckedCreateWithoutBlogsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutBlogsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const TagCreateOrConnectWithoutBlogsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutBlogsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutBlogsInputSchema),z.lazy(() => TagUncheckedCreateWithoutBlogsInputSchema) ]),
}).strict();

export const BlogUpsertWithoutTagsInputSchema: z.ZodType<Prisma.BlogUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => BlogUpdateWithoutTagsInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutTagsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const BlogUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.BlogUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => BlogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BlogUpdateWithoutTagsInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const BlogUpdateWithoutTagsInputSchema: z.ZodType<Prisma.BlogUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const TagUpsertWithoutBlogsInputSchema: z.ZodType<Prisma.TagUpsertWithoutBlogsInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutBlogsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutBlogsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutBlogsInputSchema),z.lazy(() => TagUncheckedCreateWithoutBlogsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutBlogsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutBlogsInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutBlogsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutBlogsInputSchema) ]),
}).strict();

export const TagUpdateWithoutBlogsInputSchema: z.ZodType<Prisma.TagUpdateWithoutBlogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagUncheckedUpdateWithoutBlogsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutBlogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutBlogLikesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBlogLikesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBlogLikesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBlogLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogLikesInputSchema) ]),
}).strict();

export const BlogCreateWithoutLikesInputSchema: z.ZodType<Prisma.BlogCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutLikesInputSchema),z.lazy(() => BlogUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const UserUpsertWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutBlogLikesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBlogLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlogLikesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBlogLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogLikesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBlogLikesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBlogLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlogLikesInputSchema) ]),
}).strict();

export const UserUpdateWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutBlogLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBlogLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBlogLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BlogUpsertWithoutLikesInputSchema: z.ZodType<Prisma.BlogUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => BlogUpdateWithoutLikesInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutLikesInputSchema),z.lazy(() => BlogUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const BlogUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.BlogUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => BlogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BlogUpdateWithoutLikesInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const BlogUpdateWithoutLikesInputSchema: z.ZodType<Prisma.BlogUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogCreateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogCreateWithoutBlogAuthorsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutBlogAuthorsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutBlogAuthorsInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutBlogAuthorsInputSchema) ]),
}).strict();

export const AuthorCreateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorCreateWithoutBlogAuthorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuthorsInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorUncheckedCreateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorUncheckedCreateWithoutBlogAuthorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorCreateOrConnectWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorCreateOrConnectWithoutBlogAuthorsInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthorCreateWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBlogAuthorsInputSchema) ]),
}).strict();

export const BlogUpsertWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogUpsertWithoutBlogAuthorsInput> = z.object({
  update: z.union([ z.lazy(() => BlogUpdateWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutBlogAuthorsInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUncheckedCreateWithoutBlogAuthorsInputSchema) ]),
  where: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const BlogUpdateToOneWithWhereWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogUpdateToOneWithWhereWithoutBlogAuthorsInput> = z.object({
  where: z.lazy(() => BlogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BlogUpdateWithoutBlogAuthorsInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutBlogAuthorsInputSchema) ]),
}).strict();

export const BlogUpdateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogUpdateWithoutBlogAuthorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutBlogAuthorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const AuthorUpsertWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorUpsertWithoutBlogAuthorsInput> = z.object({
  update: z.union([ z.lazy(() => AuthorUpdateWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutBlogAuthorsInputSchema) ]),
  create: z.union([ z.lazy(() => AuthorCreateWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutBlogAuthorsInputSchema) ]),
  where: z.lazy(() => AuthorWhereInputSchema).optional()
}).strict();

export const AuthorUpdateToOneWithWhereWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorUpdateToOneWithWhereWithoutBlogAuthorsInput> = z.object({
  where: z.lazy(() => AuthorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AuthorUpdateWithoutBlogAuthorsInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutBlogAuthorsInputSchema) ]),
}).strict();

export const AuthorUpdateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorUpdateWithoutBlogAuthorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneWithoutAuthorsNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const AuthorUncheckedUpdateWithoutBlogAuthorsInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateWithoutBlogAuthorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const PollCreateWithoutOptionsInputSchema: z.ZodType<Prisma.PollCreateWithoutOptionsInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutPollsInputSchema),
  Vote: z.lazy(() => VoteCreateNestedManyWithoutPollInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollUncheckedCreateWithoutOptionsInputSchema: z.ZodType<Prisma.PollUncheckedCreateWithoutOptionsInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string(),
  newsItemId: z.string().optional().nullable(),
  Vote: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollCreateOrConnectWithoutOptionsInputSchema: z.ZodType<Prisma.PollCreateOrConnectWithoutOptionsInput> = z.object({
  where: z.lazy(() => PollWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PollCreateWithoutOptionsInputSchema),z.lazy(() => PollUncheckedCreateWithoutOptionsInputSchema) ]),
}).strict();

export const VoteCreateWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteCreateWithoutPollOptionInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  poll: z.lazy(() => PollCreateNestedOneWithoutVoteInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutVotesInputSchema).optional()
}).strict();

export const VoteUncheckedCreateWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUncheckedCreateWithoutPollOptionInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const VoteCreateOrConnectWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteCreateOrConnectWithoutPollOptionInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VoteCreateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema) ]),
}).strict();

export const VoteCreateManyPollOptionInputEnvelopeSchema: z.ZodType<Prisma.VoteCreateManyPollOptionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VoteCreateManyPollOptionInputSchema),z.lazy(() => VoteCreateManyPollOptionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PollUpsertWithoutOptionsInputSchema: z.ZodType<Prisma.PollUpsertWithoutOptionsInput> = z.object({
  update: z.union([ z.lazy(() => PollUpdateWithoutOptionsInputSchema),z.lazy(() => PollUncheckedUpdateWithoutOptionsInputSchema) ]),
  create: z.union([ z.lazy(() => PollCreateWithoutOptionsInputSchema),z.lazy(() => PollUncheckedCreateWithoutOptionsInputSchema) ]),
  where: z.lazy(() => PollWhereInputSchema).optional()
}).strict();

export const PollUpdateToOneWithWhereWithoutOptionsInputSchema: z.ZodType<Prisma.PollUpdateToOneWithWhereWithoutOptionsInput> = z.object({
  where: z.lazy(() => PollWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PollUpdateWithoutOptionsInputSchema),z.lazy(() => PollUncheckedUpdateWithoutOptionsInputSchema) ]),
}).strict();

export const PollUpdateWithoutOptionsInputSchema: z.ZodType<Prisma.PollUpdateWithoutOptionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutPollsNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUpdateManyWithoutPollNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollUncheckedUpdateWithoutOptionsInputSchema: z.ZodType<Prisma.PollUncheckedUpdateWithoutOptionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Vote: z.lazy(() => VoteUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const VoteUpsertWithWhereUniqueWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUpsertWithWhereUniqueWithoutPollOptionInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VoteUpdateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutPollOptionInputSchema) ]),
  create: z.union([ z.lazy(() => VoteCreateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedCreateWithoutPollOptionInputSchema) ]),
}).strict();

export const VoteUpdateWithWhereUniqueWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUpdateWithWhereUniqueWithoutPollOptionInput> = z.object({
  where: z.lazy(() => VoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateWithoutPollOptionInputSchema),z.lazy(() => VoteUncheckedUpdateWithoutPollOptionInputSchema) ]),
}).strict();

export const VoteUpdateManyWithWhereWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUpdateManyWithWhereWithoutPollOptionInput> = z.object({
  where: z.lazy(() => VoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VoteUpdateManyMutationInputSchema),z.lazy(() => VoteUncheckedUpdateManyWithoutPollOptionInputSchema) ]),
}).strict();

export const BlogAuthorCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutBlogAuthorsInputSchema)
}).strict();

export const BlogAuthorUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string()
}).strict();

export const BlogAuthorCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => BlogAuthorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const BlogAuthorCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.BlogAuthorCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogAuthorCreateManyAuthorInputSchema),z.lazy(() => BlogAuthorCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutAuthorsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuthorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAuthorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAuthorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthorsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthorsInputSchema) ]),
}).strict();

export const SocialMediaCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSocialMediaInputSchema).optional()
}).strict();

export const SocialMediaUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const SocialMediaCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => SocialMediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const SocialMediaCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.SocialMediaCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SocialMediaCreateManyAuthorInputSchema),z.lazy(() => SocialMediaCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogAuthorUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => BlogAuthorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogAuthorUpdateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => BlogAuthorCreateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const BlogAuthorUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => BlogAuthorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogAuthorUpdateWithoutAuthorInputSchema),z.lazy(() => BlogAuthorUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const BlogAuthorUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => BlogAuthorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogAuthorUpdateManyMutationInputSchema),z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const UserUpsertWithoutAuthorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuthorsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuthorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthorsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthorsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAuthorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuthorsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuthorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthorsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAuthorsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuthorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAuthorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuthorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SocialMediaUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => SocialMediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SocialMediaUpdateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const SocialMediaUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => SocialMediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SocialMediaUpdateWithoutAuthorInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const SocialMediaUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => SocialMediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SocialMediaUpdateManyMutationInputSchema),z.lazy(() => SocialMediaUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const UserCreateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserCreateWithoutSocialMediaInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSocialMediaInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSocialMediaInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]),
}).strict();

export const AuthorCreateWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorCreateWithoutSocialMediaInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutAuthorInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuthorsInputSchema).optional()
}).strict();

export const AuthorUncheckedCreateWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorUncheckedCreateWithoutSocialMediaInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const AuthorCreateOrConnectWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorCreateOrConnectWithoutSocialMediaInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthorCreateWithoutSocialMediaInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutSocialMediaInputSchema) ]),
}).strict();

export const UserUpsertWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUpsertWithoutSocialMediaInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSocialMediaInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSocialMediaInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSocialMediaInputSchema) ]),
}).strict();

export const UserUpdateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUpdateWithoutSocialMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSocialMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AuthorUpsertWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorUpsertWithoutSocialMediaInput> = z.object({
  update: z.union([ z.lazy(() => AuthorUpdateWithoutSocialMediaInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutSocialMediaInputSchema) ]),
  create: z.union([ z.lazy(() => AuthorCreateWithoutSocialMediaInputSchema),z.lazy(() => AuthorUncheckedCreateWithoutSocialMediaInputSchema) ]),
  where: z.lazy(() => AuthorWhereInputSchema).optional()
}).strict();

export const AuthorUpdateToOneWithWhereWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorUpdateToOneWithWhereWithoutSocialMediaInput> = z.object({
  where: z.lazy(() => AuthorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AuthorUpdateWithoutSocialMediaInputSchema),z.lazy(() => AuthorUncheckedUpdateWithoutSocialMediaInputSchema) ]),
}).strict();

export const AuthorUpdateWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorUpdateWithoutSocialMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutAuthorNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAuthorsNestedInputSchema).optional()
}).strict();

export const AuthorUncheckedUpdateWithoutSocialMediaInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateWithoutSocialMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutImageInputSchema: z.ZodType<Prisma.UserCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutImageInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  cloudinaryImageId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  interests: z.union([ z.lazy(() => UserCreateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutImageInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutImageInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutImageInputSchema) ]),
}).strict();

export const CategoryCreateWithoutImageInputSchema: z.ZodType<Prisma.CategoryCreateWithoutImageInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  polls: z.lazy(() => PollCreateNestedManyWithoutCategoryInputSchema).optional(),
  Blog: z.lazy(() => BlogCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutImageInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutImageInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  polls: z.lazy(() => PollUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  Blog: z.lazy(() => BlogUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutImageInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutImageInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutImageInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutImageInputSchema) ]),
}).strict();

export const NewsItemCreateWithoutImageInputSchema: z.ZodType<Prisma.NewsItemCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  poll: z.lazy(() => PollCreateNestedOneWithoutNewsItemInputSchema).optional(),
  blog: z.lazy(() => BlogCreateNestedOneWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemUncheckedCreateWithoutImageInputSchema: z.ZodType<Prisma.NewsItemUncheckedCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  poll: z.lazy(() => PollUncheckedCreateNestedOneWithoutNewsItemInputSchema).optional(),
  blog: z.lazy(() => BlogUncheckedCreateNestedOneWithoutNewsItemInputSchema).optional()
}).strict();

export const NewsItemCreateOrConnectWithoutImageInputSchema: z.ZodType<Prisma.NewsItemCreateOrConnectWithoutImageInput> = z.object({
  where: z.lazy(() => NewsItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsItemCreateWithoutImageInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutImageInputSchema) ]),
}).strict();

export const BlogCreateWithoutImageInputSchema: z.ZodType<Prisma.BlogCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutImageInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutImageInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutImageInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutImageInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImageInputSchema) ]),
}).strict();

export const PollCreateWithoutImageInputSchema: z.ZodType<Prisma.PollCreateWithoutImageInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutPollsInputSchema),
  options: z.lazy(() => PollOptionCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteCreateNestedManyWithoutPollInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutPollInputSchema).optional()
}).strict();

export const PollUncheckedCreateWithoutImageInputSchema: z.ZodType<Prisma.PollUncheckedCreateWithoutImageInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string(),
  newsItemId: z.string().optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedCreateNestedManyWithoutPollInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedCreateNestedManyWithoutPollInputSchema).optional()
}).strict();

export const PollCreateOrConnectWithoutImageInputSchema: z.ZodType<Prisma.PollCreateOrConnectWithoutImageInput> = z.object({
  where: z.lazy(() => PollWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PollCreateWithoutImageInputSchema),z.lazy(() => PollUncheckedCreateWithoutImageInputSchema) ]),
}).strict();

export const BlogCreateWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogCreateWithoutImagenSeoInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenCard: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenCardInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutImagenSeoInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutImagenSeoInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema) ]),
}).strict();

export const BlogCreateManyImagenSeoInputEnvelopeSchema: z.ZodType<Prisma.BlogCreateManyImagenSeoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogCreateManyImagenSeoInputSchema),z.lazy(() => BlogCreateManyImagenSeoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogCreateWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogCreateWithoutImagenCardInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  imagenSeo: z.lazy(() => ImageCreateNestedOneWithoutBlogImagenSeoInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemCreateNestedOneWithoutBlogInputSchema).optional(),
  Image: z.lazy(() => ImageCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagCreateNestedManyWithoutBlogInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutBlogInputSchema).optional()
}).strict();

export const BlogUncheckedCreateWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutImagenCardInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  Image: z.lazy(() => ImageUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedCreateNestedManyWithoutBlogInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedCreateNestedManyWithoutBlogInputSchema).optional()
}).strict();

export const BlogCreateOrConnectWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutImagenCardInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema) ]),
}).strict();

export const BlogCreateManyImagenCardInputEnvelopeSchema: z.ZodType<Prisma.BlogCreateManyImagenCardInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogCreateManyImagenCardInputSchema),z.lazy(() => BlogCreateManyImagenCardInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutImageInputSchema: z.ZodType<Prisma.UserUpsertWithoutImageInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutImageInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutImageInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutImageInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutImageInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutImageInputSchema) ]),
}).strict();

export const UserUpdateWithoutImageInputSchema: z.ZodType<Prisma.UserUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutImageInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cloudinaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interests: z.union([ z.lazy(() => UserUpdateinterestsInputSchema),z.string().array() ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  info: z.lazy(() => InfoUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  blogLikes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  readingHistory: z.lazy(() => ReadingHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CategoryUpsertWithoutImageInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutImageInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutImageInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutImageInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutImageInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutImageInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutImageInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutImageInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutImageInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutImageInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutImageInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  polls: z.lazy(() => PollUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Blog: z.lazy(() => BlogUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutImageInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  polls: z.lazy(() => PollUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  Blog: z.lazy(() => BlogUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const NewsItemUpsertWithoutImageInputSchema: z.ZodType<Prisma.NewsItemUpsertWithoutImageInput> = z.object({
  update: z.union([ z.lazy(() => NewsItemUpdateWithoutImageInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutImageInputSchema) ]),
  create: z.union([ z.lazy(() => NewsItemCreateWithoutImageInputSchema),z.lazy(() => NewsItemUncheckedCreateWithoutImageInputSchema) ]),
  where: z.lazy(() => NewsItemWhereInputSchema).optional()
}).strict();

export const NewsItemUpdateToOneWithWhereWithoutImageInputSchema: z.ZodType<Prisma.NewsItemUpdateToOneWithWhereWithoutImageInput> = z.object({
  where: z.lazy(() => NewsItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NewsItemUpdateWithoutImageInputSchema),z.lazy(() => NewsItemUncheckedUpdateWithoutImageInputSchema) ]),
}).strict();

export const NewsItemUpdateWithoutImageInputSchema: z.ZodType<Prisma.NewsItemUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  poll: z.lazy(() => PollUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const NewsItemUncheckedUpdateWithoutImageInputSchema: z.ZodType<Prisma.NewsItemUncheckedUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  poll: z.lazy(() => PollUncheckedUpdateOneWithoutNewsItemNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUncheckedUpdateOneWithoutNewsItemNestedInputSchema).optional()
}).strict();

export const BlogUpsertWithoutImageInputSchema: z.ZodType<Prisma.BlogUpsertWithoutImageInput> = z.object({
  update: z.union([ z.lazy(() => BlogUpdateWithoutImageInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutImageInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutImageInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImageInputSchema) ]),
  where: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const BlogUpdateToOneWithWhereWithoutImageInputSchema: z.ZodType<Prisma.BlogUpdateToOneWithWhereWithoutImageInput> = z.object({
  where: z.lazy(() => BlogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BlogUpdateWithoutImageInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutImageInputSchema) ]),
}).strict();

export const BlogUpdateWithoutImageInputSchema: z.ZodType<Prisma.BlogUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutImageInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const PollUpsertWithoutImageInputSchema: z.ZodType<Prisma.PollUpsertWithoutImageInput> = z.object({
  update: z.union([ z.lazy(() => PollUpdateWithoutImageInputSchema),z.lazy(() => PollUncheckedUpdateWithoutImageInputSchema) ]),
  create: z.union([ z.lazy(() => PollCreateWithoutImageInputSchema),z.lazy(() => PollUncheckedCreateWithoutImageInputSchema) ]),
  where: z.lazy(() => PollWhereInputSchema).optional()
}).strict();

export const PollUpdateToOneWithWhereWithoutImageInputSchema: z.ZodType<Prisma.PollUpdateToOneWithWhereWithoutImageInput> = z.object({
  where: z.lazy(() => PollWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PollUpdateWithoutImageInputSchema),z.lazy(() => PollUncheckedUpdateWithoutImageInputSchema) ]),
}).strict();

export const PollUpdateWithoutImageInputSchema: z.ZodType<Prisma.PollUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutPollsNestedInputSchema).optional(),
  options: z.lazy(() => PollOptionUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUpdateManyWithoutPollNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutPollNestedInputSchema).optional()
}).strict();

export const PollUncheckedUpdateWithoutImageInputSchema: z.ZodType<Prisma.PollUncheckedUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const BlogUpsertWithWhereUniqueWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUpsertWithWhereUniqueWithoutImagenSeoInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogUpdateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutImagenSeoInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenSeoInputSchema) ]),
}).strict();

export const BlogUpdateWithWhereUniqueWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUpdateWithWhereUniqueWithoutImagenSeoInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateWithoutImagenSeoInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutImagenSeoInputSchema) ]),
}).strict();

export const BlogUpdateManyWithWhereWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUpdateManyWithWhereWithoutImagenSeoInput> = z.object({
  where: z.lazy(() => BlogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateManyMutationInputSchema),z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoInputSchema) ]),
}).strict();

export const BlogUpsertWithWhereUniqueWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUpsertWithWhereUniqueWithoutImagenCardInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogUpdateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutImagenCardInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedCreateWithoutImagenCardInputSchema) ]),
}).strict();

export const BlogUpdateWithWhereUniqueWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUpdateWithWhereUniqueWithoutImagenCardInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateWithoutImagenCardInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutImagenCardInputSchema) ]),
}).strict();

export const BlogUpdateManyWithWhereWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUpdateManyWithWhereWithoutImagenCardInput> = z.object({
  where: z.lazy(() => BlogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateManyMutationInputSchema),z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  expires: z.coerce.date()
}).strict();

export const VoteCreateManyUserInputSchema: z.ZodType<Prisma.VoteCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string(),
  pollOptionId: z.string()
}).strict();

export const BlogLikeCreateManyUserInputSchema: z.ZodType<Prisma.BlogLikeCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AuthorCreateManyUserInputSchema: z.ZodType<Prisma.AuthorCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  link: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable()
}).strict();

export const ImageCreateManyUserInputSchema: z.ZodType<Prisma.ImageCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable()
}).strict();

export const SocialMediaCreateManyUserInputSchema: z.ZodType<Prisma.SocialMediaCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string().optional().nullable()
}).strict();

export const ReadingHistoryCreateManyUserInputSchema: z.ZodType<Prisma.ReadingHistoryCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  articleId: z.string(),
  readAt: z.coerce.date().optional(),
  readTime: z.number().int()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUpdateWithoutUserInputSchema: z.ZodType<Prisma.VoteUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  poll: z.lazy(() => PollUpdateOneRequiredWithoutVoteNestedInputSchema).optional(),
  pollOption: z.lazy(() => PollOptionUpdateOneRequiredWithoutVotesNestedInputSchema).optional()
}).strict();

export const VoteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pollOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pollOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogLikeUpdateWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blog: z.lazy(() => BlogUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const BlogLikeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogLikeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthorUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthorUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutAuthorNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const AuthorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const AuthorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AuthorUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImageUpdateWithoutUserInputSchema: z.ZodType<Prisma.ImageUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutImageNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutImageNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutImageNestedInputSchema).optional(),
  poll: z.lazy(() => PollUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaUpdateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => AuthorUpdateOneWithoutSocialMediaNestedInputSchema).optional()
}).strict();

export const SocialMediaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReadingHistoryUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReadingHistoryUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReadingHistoryUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReadingHistoryUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  readAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PollCreateManyCategoryInputSchema: z.ZodType<Prisma.PollCreateManyCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  Archived: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ArchivedAt: z.coerce.date().optional().nullable(),
  Deleted: z.boolean().optional(),
  DeletedAt: z.coerce.date().optional().nullable(),
  newsItemId: z.string().optional().nullable()
}).strict();

export const ImageCreateManyCategoryInputSchema: z.ZodType<Prisma.ImageCreateManyCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable()
}).strict();

export const BlogCreateManyCategoryInputSchema: z.ZodType<Prisma.BlogCreateManyCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional()
}).strict();

export const PollUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.PollUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.lazy(() => PollOptionUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUpdateManyWithoutPollNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.PollUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.lazy(() => PollOptionUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Vote: z.lazy(() => VoteUncheckedUpdateManyWithoutPollNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutPollNestedInputSchema).optional()
}).strict();

export const PollUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.PollUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ArchivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  DeletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImageUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutImageNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutImageNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutImageNestedInputSchema).optional(),
  poll: z.lazy(() => PollUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageCreateManyNewsItemInputSchema: z.ZodType<Prisma.ImageCreateManyNewsItemInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable()
}).strict();

export const ImageUpdateWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUpdateWithoutNewsItemInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutImageNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutImageNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutImageNestedInputSchema).optional(),
  poll: z.lazy(() => PollUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutNewsItemInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateManyWithoutNewsItemInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutNewsItemInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PollOptionCreateManyPollInputSchema: z.ZodType<Prisma.PollOptionCreateManyPollInput> = z.object({
  id: z.string().uuid().optional(),
  text: z.string()
}).strict();

export const VoteCreateManyPollInputSchema: z.ZodType<Prisma.VoteCreateManyPollInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollOptionId: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const ImageCreateManyPollInputSchema: z.ZodType<Prisma.ImageCreateManyPollInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  blogId: z.string().optional().nullable()
}).strict();

export const PollOptionUpdateWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  votes: z.lazy(() => VoteUpdateManyWithoutPollOptionNestedInputSchema).optional()
}).strict();

export const PollOptionUncheckedUpdateWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUncheckedUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  votes: z.lazy(() => VoteUncheckedUpdateManyWithoutPollOptionNestedInputSchema).optional()
}).strict();

export const PollOptionUncheckedUpdateManyWithoutPollInputSchema: z.ZodType<Prisma.PollOptionUncheckedUpdateManyWithoutPollInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteUpdateWithoutPollInputSchema: z.ZodType<Prisma.VoteUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollOption: z.lazy(() => PollOptionUpdateOneRequiredWithoutVotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutVotesNestedInputSchema).optional()
}).strict();

export const VoteUncheckedUpdateWithoutPollInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VoteUncheckedUpdateManyWithoutPollInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutPollInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImageUpdateWithoutPollInputSchema: z.ZodType<Prisma.ImageUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutImageNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutImageNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutImageNestedInputSchema).optional(),
  blog: z.lazy(() => BlogUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutPollInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutPollInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateManyWithoutPollInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutPollInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImageCreateManyBlogInputSchema: z.ZodType<Prisma.ImageCreateManyBlogInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  publicId: z.string(),
  alt: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  pollId: z.string().optional().nullable()
}).strict();

export const BlogAuthorCreateManyBlogInputSchema: z.ZodType<Prisma.BlogAuthorCreateManyBlogInput> = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string()
}).strict();

export const BlogLikeCreateManyBlogInputSchema: z.ZodType<Prisma.BlogLikeCreateManyBlogInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const BlogTagCreateManyBlogInputSchema: z.ZodType<Prisma.BlogTagCreateManyBlogInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string()
}).strict();

export const ImageUpdateWithoutBlogInputSchema: z.ZodType<Prisma.ImageUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutImageNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutImageNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutImageNestedInputSchema).optional(),
  poll: z.lazy(() => PollUpdateOneWithoutImageNestedInputSchema).optional(),
  blogImagenSeo: z.lazy(() => BlogUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutBlogInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blogImagenSeo: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenSeoNestedInputSchema).optional(),
  blogImagenCard: z.lazy(() => BlogUncheckedUpdateManyWithoutImagenCardNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateManyWithoutBlogInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pollId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogAuthorUpdateWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => AuthorUpdateOneRequiredWithoutBlogAuthorsNestedInputSchema).optional()
}).strict();

export const BlogAuthorUncheckedUpdateWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogAuthorUncheckedUpdateManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateManyWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogLikeUpdateWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBlogLikesNestedInputSchema).optional()
}).strict();

export const BlogLikeUncheckedUpdateWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogLikeUncheckedUpdateManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogLikeUncheckedUpdateManyWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogTagUpdateWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutBlogsNestedInputSchema).optional()
}).strict();

export const BlogTagUncheckedUpdateWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogTagUncheckedUpdateManyWithoutBlogInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateManyWithoutBlogInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogTagCreateManyTagInputSchema: z.ZodType<Prisma.BlogTagCreateManyTagInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string()
}).strict();

export const BlogTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blog: z.lazy(() => BlogUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const BlogTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.BlogTagUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VoteCreateManyPollOptionInputSchema: z.ZodType<Prisma.VoteCreateManyPollOptionInput> = z.object({
  id: z.string().uuid().optional(),
  hashedIp: z.string(),
  anonymousId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pollId: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const VoteUpdateWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUpdateWithoutPollOptionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  poll: z.lazy(() => PollUpdateOneRequiredWithoutVoteNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutVotesNestedInputSchema).optional()
}).strict();

export const VoteUncheckedUpdateWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateWithoutPollOptionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VoteUncheckedUpdateManyWithoutPollOptionInputSchema: z.ZodType<Prisma.VoteUncheckedUpdateManyWithoutPollOptionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedIp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anonymousId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pollId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogAuthorCreateManyAuthorInputSchema: z.ZodType<Prisma.BlogAuthorCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  blogId: z.string()
}).strict();

export const SocialMediaCreateManyAuthorInputSchema: z.ZodType<Prisma.SocialMediaCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  platform: z.string(),
  url: z.string(),
  username: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable()
}).strict();

export const BlogAuthorUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blog: z.lazy(() => BlogUpdateOneRequiredWithoutBlogAuthorsNestedInputSchema).optional()
}).strict();

export const BlogAuthorUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogAuthorUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.BlogAuthorUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SocialMediaUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutSocialMediaNestedInputSchema).optional()
}).strict();

export const SocialMediaUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogCreateManyImagenSeoInputSchema: z.ZodType<Prisma.BlogCreateManyImagenSeoInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  imagenCardId: z.string().optional().nullable(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable()
}).strict();

export const BlogCreateManyImagenCardInputSchema: z.ZodType<Prisma.BlogCreateManyImagenCardInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string(),
  titlePunch: z.string().optional().nullable(),
  slug: z.string(),
  imagenSeoId: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  dateNews: z.coerce.date(),
  newsItemId: z.string().optional().nullable(),
  readTime: z.number().int().optional().nullable(),
  views: z.number().int().optional(),
  dateCreated: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable()
}).strict();

export const BlogUpdateWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUpdateWithoutImagenSeoInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCard: z.lazy(() => ImageUpdateOneWithoutBlogImagenCardNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutImagenSeoInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateManyWithoutImagenSeoInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutImagenSeoInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BlogUpdateWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUpdateWithoutImagenCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeo: z.lazy(() => ImageUpdateOneWithoutBlogImagenSeoNestedInputSchema).optional(),
  newsItem: z.lazy(() => NewsItemUpdateOneWithoutBlogNestedInputSchema).optional(),
  Image: z.lazy(() => ImageUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUpdateManyWithoutBlogNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutImagenCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Image: z.lazy(() => ImageUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  blogAuthors: z.lazy(() => BlogAuthorUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  likes: z.lazy(() => BlogLikeUncheckedUpdateManyWithoutBlogNestedInputSchema).optional(),
  tags: z.lazy(() => BlogTagUncheckedUpdateManyWithoutBlogNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateManyWithoutImagenCardInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutImagenCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  titlePunch: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagenSeoId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seoDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateNews: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  newsItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  readTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ReadingHistoryFindFirstArgsSchema: z.ZodType<Prisma.ReadingHistoryFindFirstArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  where: ReadingHistoryWhereInputSchema.optional(),
  orderBy: z.union([ ReadingHistoryOrderByWithRelationInputSchema.array(),ReadingHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ReadingHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReadingHistoryScalarFieldEnumSchema,ReadingHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReadingHistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReadingHistoryFindFirstOrThrowArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  where: ReadingHistoryWhereInputSchema.optional(),
  orderBy: z.union([ ReadingHistoryOrderByWithRelationInputSchema.array(),ReadingHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ReadingHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReadingHistoryScalarFieldEnumSchema,ReadingHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReadingHistoryFindManyArgsSchema: z.ZodType<Prisma.ReadingHistoryFindManyArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  where: ReadingHistoryWhereInputSchema.optional(),
  orderBy: z.union([ ReadingHistoryOrderByWithRelationInputSchema.array(),ReadingHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ReadingHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReadingHistoryScalarFieldEnumSchema,ReadingHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReadingHistoryAggregateArgsSchema: z.ZodType<Prisma.ReadingHistoryAggregateArgs> = z.object({
  where: ReadingHistoryWhereInputSchema.optional(),
  orderBy: z.union([ ReadingHistoryOrderByWithRelationInputSchema.array(),ReadingHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ReadingHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReadingHistoryGroupByArgsSchema: z.ZodType<Prisma.ReadingHistoryGroupByArgs> = z.object({
  where: ReadingHistoryWhereInputSchema.optional(),
  orderBy: z.union([ ReadingHistoryOrderByWithAggregationInputSchema.array(),ReadingHistoryOrderByWithAggregationInputSchema ]).optional(),
  by: ReadingHistoryScalarFieldEnumSchema.array(),
  having: ReadingHistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReadingHistoryFindUniqueArgsSchema: z.ZodType<Prisma.ReadingHistoryFindUniqueArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  where: ReadingHistoryWhereUniqueInputSchema,
}).strict() ;

export const ReadingHistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReadingHistoryFindUniqueOrThrowArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  where: ReadingHistoryWhereUniqueInputSchema,
}).strict() ;

export const InfoFindFirstArgsSchema: z.ZodType<Prisma.InfoFindFirstArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  where: InfoWhereInputSchema.optional(),
  orderBy: z.union([ InfoOrderByWithRelationInputSchema.array(),InfoOrderByWithRelationInputSchema ]).optional(),
  cursor: InfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfoScalarFieldEnumSchema,InfoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InfoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InfoFindFirstOrThrowArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  where: InfoWhereInputSchema.optional(),
  orderBy: z.union([ InfoOrderByWithRelationInputSchema.array(),InfoOrderByWithRelationInputSchema ]).optional(),
  cursor: InfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfoScalarFieldEnumSchema,InfoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InfoFindManyArgsSchema: z.ZodType<Prisma.InfoFindManyArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  where: InfoWhereInputSchema.optional(),
  orderBy: z.union([ InfoOrderByWithRelationInputSchema.array(),InfoOrderByWithRelationInputSchema ]).optional(),
  cursor: InfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfoScalarFieldEnumSchema,InfoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InfoAggregateArgsSchema: z.ZodType<Prisma.InfoAggregateArgs> = z.object({
  where: InfoWhereInputSchema.optional(),
  orderBy: z.union([ InfoOrderByWithRelationInputSchema.array(),InfoOrderByWithRelationInputSchema ]).optional(),
  cursor: InfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InfoGroupByArgsSchema: z.ZodType<Prisma.InfoGroupByArgs> = z.object({
  where: InfoWhereInputSchema.optional(),
  orderBy: z.union([ InfoOrderByWithAggregationInputSchema.array(),InfoOrderByWithAggregationInputSchema ]).optional(),
  by: InfoScalarFieldEnumSchema.array(),
  having: InfoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InfoFindUniqueArgsSchema: z.ZodType<Prisma.InfoFindUniqueArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  where: InfoWhereUniqueInputSchema,
}).strict() ;

export const InfoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InfoFindUniqueOrThrowArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  where: InfoWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VoteFindFirstArgsSchema: z.ZodType<Prisma.VoteFindFirstArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VoteScalarFieldEnumSchema,VoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VoteFindFirstOrThrowArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VoteScalarFieldEnumSchema,VoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VoteFindManyArgsSchema: z.ZodType<Prisma.VoteFindManyArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VoteScalarFieldEnumSchema,VoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VoteAggregateArgsSchema: z.ZodType<Prisma.VoteAggregateArgs> = z.object({
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithRelationInputSchema.array(),VoteOrderByWithRelationInputSchema ]).optional(),
  cursor: VoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VoteGroupByArgsSchema: z.ZodType<Prisma.VoteGroupByArgs> = z.object({
  where: VoteWhereInputSchema.optional(),
  orderBy: z.union([ VoteOrderByWithAggregationInputSchema.array(),VoteOrderByWithAggregationInputSchema ]).optional(),
  by: VoteScalarFieldEnumSchema.array(),
  having: VoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VoteFindUniqueArgsSchema: z.ZodType<Prisma.VoteFindUniqueArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const VoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VoteFindUniqueOrThrowArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const NewsItemFindFirstArgsSchema: z.ZodType<Prisma.NewsItemFindFirstArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  where: NewsItemWhereInputSchema.optional(),
  orderBy: z.union([ NewsItemOrderByWithRelationInputSchema.array(),NewsItemOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsItemScalarFieldEnumSchema,NewsItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NewsItemFindFirstOrThrowArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  where: NewsItemWhereInputSchema.optional(),
  orderBy: z.union([ NewsItemOrderByWithRelationInputSchema.array(),NewsItemOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsItemScalarFieldEnumSchema,NewsItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsItemFindManyArgsSchema: z.ZodType<Prisma.NewsItemFindManyArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  where: NewsItemWhereInputSchema.optional(),
  orderBy: z.union([ NewsItemOrderByWithRelationInputSchema.array(),NewsItemOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsItemScalarFieldEnumSchema,NewsItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsItemAggregateArgsSchema: z.ZodType<Prisma.NewsItemAggregateArgs> = z.object({
  where: NewsItemWhereInputSchema.optional(),
  orderBy: z.union([ NewsItemOrderByWithRelationInputSchema.array(),NewsItemOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsItemGroupByArgsSchema: z.ZodType<Prisma.NewsItemGroupByArgs> = z.object({
  where: NewsItemWhereInputSchema.optional(),
  orderBy: z.union([ NewsItemOrderByWithAggregationInputSchema.array(),NewsItemOrderByWithAggregationInputSchema ]).optional(),
  by: NewsItemScalarFieldEnumSchema.array(),
  having: NewsItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsItemFindUniqueArgsSchema: z.ZodType<Prisma.NewsItemFindUniqueArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  where: NewsItemWhereUniqueInputSchema,
}).strict() ;

export const NewsItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NewsItemFindUniqueOrThrowArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  where: NewsItemWhereUniqueInputSchema,
}).strict() ;

export const PollFindFirstArgsSchema: z.ZodType<Prisma.PollFindFirstArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  where: PollWhereInputSchema.optional(),
  orderBy: z.union([ PollOrderByWithRelationInputSchema.array(),PollOrderByWithRelationInputSchema ]).optional(),
  cursor: PollWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PollScalarFieldEnumSchema,PollScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PollFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PollFindFirstOrThrowArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  where: PollWhereInputSchema.optional(),
  orderBy: z.union([ PollOrderByWithRelationInputSchema.array(),PollOrderByWithRelationInputSchema ]).optional(),
  cursor: PollWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PollScalarFieldEnumSchema,PollScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PollFindManyArgsSchema: z.ZodType<Prisma.PollFindManyArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  where: PollWhereInputSchema.optional(),
  orderBy: z.union([ PollOrderByWithRelationInputSchema.array(),PollOrderByWithRelationInputSchema ]).optional(),
  cursor: PollWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PollScalarFieldEnumSchema,PollScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PollAggregateArgsSchema: z.ZodType<Prisma.PollAggregateArgs> = z.object({
  where: PollWhereInputSchema.optional(),
  orderBy: z.union([ PollOrderByWithRelationInputSchema.array(),PollOrderByWithRelationInputSchema ]).optional(),
  cursor: PollWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PollGroupByArgsSchema: z.ZodType<Prisma.PollGroupByArgs> = z.object({
  where: PollWhereInputSchema.optional(),
  orderBy: z.union([ PollOrderByWithAggregationInputSchema.array(),PollOrderByWithAggregationInputSchema ]).optional(),
  by: PollScalarFieldEnumSchema.array(),
  having: PollScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PollFindUniqueArgsSchema: z.ZodType<Prisma.PollFindUniqueArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  where: PollWhereUniqueInputSchema,
}).strict() ;

export const PollFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PollFindUniqueOrThrowArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  where: PollWhereUniqueInputSchema,
}).strict() ;

export const BlogFindFirstArgsSchema: z.ZodType<Prisma.BlogFindFirstArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema,BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BlogFindFirstOrThrowArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema,BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogFindManyArgsSchema: z.ZodType<Prisma.BlogFindManyArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema,BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogAggregateArgsSchema: z.ZodType<Prisma.BlogAggregateArgs> = z.object({
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogGroupByArgsSchema: z.ZodType<Prisma.BlogGroupByArgs> = z.object({
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithAggregationInputSchema.array(),BlogOrderByWithAggregationInputSchema ]).optional(),
  by: BlogScalarFieldEnumSchema.array(),
  having: BlogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogFindUniqueArgsSchema: z.ZodType<Prisma.BlogFindUniqueArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const BlogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlogFindUniqueOrThrowArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const BlogTagFindFirstArgsSchema: z.ZodType<Prisma.BlogTagFindFirstArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  where: BlogTagWhereInputSchema.optional(),
  orderBy: z.union([ BlogTagOrderByWithRelationInputSchema.array(),BlogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogTagScalarFieldEnumSchema,BlogTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BlogTagFindFirstOrThrowArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  where: BlogTagWhereInputSchema.optional(),
  orderBy: z.union([ BlogTagOrderByWithRelationInputSchema.array(),BlogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogTagScalarFieldEnumSchema,BlogTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogTagFindManyArgsSchema: z.ZodType<Prisma.BlogTagFindManyArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  where: BlogTagWhereInputSchema.optional(),
  orderBy: z.union([ BlogTagOrderByWithRelationInputSchema.array(),BlogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogTagScalarFieldEnumSchema,BlogTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogTagAggregateArgsSchema: z.ZodType<Prisma.BlogTagAggregateArgs> = z.object({
  where: BlogTagWhereInputSchema.optional(),
  orderBy: z.union([ BlogTagOrderByWithRelationInputSchema.array(),BlogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogTagGroupByArgsSchema: z.ZodType<Prisma.BlogTagGroupByArgs> = z.object({
  where: BlogTagWhereInputSchema.optional(),
  orderBy: z.union([ BlogTagOrderByWithAggregationInputSchema.array(),BlogTagOrderByWithAggregationInputSchema ]).optional(),
  by: BlogTagScalarFieldEnumSchema.array(),
  having: BlogTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogTagFindUniqueArgsSchema: z.ZodType<Prisma.BlogTagFindUniqueArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  where: BlogTagWhereUniqueInputSchema,
}).strict() ;

export const BlogTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlogTagFindUniqueOrThrowArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  where: BlogTagWhereUniqueInputSchema,
}).strict() ;

export const BlogLikeFindFirstArgsSchema: z.ZodType<Prisma.BlogLikeFindFirstArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  where: BlogLikeWhereInputSchema.optional(),
  orderBy: z.union([ BlogLikeOrderByWithRelationInputSchema.array(),BlogLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogLikeScalarFieldEnumSchema,BlogLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogLikeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BlogLikeFindFirstOrThrowArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  where: BlogLikeWhereInputSchema.optional(),
  orderBy: z.union([ BlogLikeOrderByWithRelationInputSchema.array(),BlogLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogLikeScalarFieldEnumSchema,BlogLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogLikeFindManyArgsSchema: z.ZodType<Prisma.BlogLikeFindManyArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  where: BlogLikeWhereInputSchema.optional(),
  orderBy: z.union([ BlogLikeOrderByWithRelationInputSchema.array(),BlogLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogLikeScalarFieldEnumSchema,BlogLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogLikeAggregateArgsSchema: z.ZodType<Prisma.BlogLikeAggregateArgs> = z.object({
  where: BlogLikeWhereInputSchema.optional(),
  orderBy: z.union([ BlogLikeOrderByWithRelationInputSchema.array(),BlogLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogLikeGroupByArgsSchema: z.ZodType<Prisma.BlogLikeGroupByArgs> = z.object({
  where: BlogLikeWhereInputSchema.optional(),
  orderBy: z.union([ BlogLikeOrderByWithAggregationInputSchema.array(),BlogLikeOrderByWithAggregationInputSchema ]).optional(),
  by: BlogLikeScalarFieldEnumSchema.array(),
  having: BlogLikeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogLikeFindUniqueArgsSchema: z.ZodType<Prisma.BlogLikeFindUniqueArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  where: BlogLikeWhereUniqueInputSchema,
}).strict() ;

export const BlogLikeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlogLikeFindUniqueOrThrowArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  where: BlogLikeWhereUniqueInputSchema,
}).strict() ;

export const BlogAuthorFindFirstArgsSchema: z.ZodType<Prisma.BlogAuthorFindFirstArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  where: BlogAuthorWhereInputSchema.optional(),
  orderBy: z.union([ BlogAuthorOrderByWithRelationInputSchema.array(),BlogAuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogAuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogAuthorScalarFieldEnumSchema,BlogAuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogAuthorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BlogAuthorFindFirstOrThrowArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  where: BlogAuthorWhereInputSchema.optional(),
  orderBy: z.union([ BlogAuthorOrderByWithRelationInputSchema.array(),BlogAuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogAuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogAuthorScalarFieldEnumSchema,BlogAuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogAuthorFindManyArgsSchema: z.ZodType<Prisma.BlogAuthorFindManyArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  where: BlogAuthorWhereInputSchema.optional(),
  orderBy: z.union([ BlogAuthorOrderByWithRelationInputSchema.array(),BlogAuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogAuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogAuthorScalarFieldEnumSchema,BlogAuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogAuthorAggregateArgsSchema: z.ZodType<Prisma.BlogAuthorAggregateArgs> = z.object({
  where: BlogAuthorWhereInputSchema.optional(),
  orderBy: z.union([ BlogAuthorOrderByWithRelationInputSchema.array(),BlogAuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogAuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogAuthorGroupByArgsSchema: z.ZodType<Prisma.BlogAuthorGroupByArgs> = z.object({
  where: BlogAuthorWhereInputSchema.optional(),
  orderBy: z.union([ BlogAuthorOrderByWithAggregationInputSchema.array(),BlogAuthorOrderByWithAggregationInputSchema ]).optional(),
  by: BlogAuthorScalarFieldEnumSchema.array(),
  having: BlogAuthorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogAuthorFindUniqueArgsSchema: z.ZodType<Prisma.BlogAuthorFindUniqueArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  where: BlogAuthorWhereUniqueInputSchema,
}).strict() ;

export const BlogAuthorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlogAuthorFindUniqueOrThrowArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  where: BlogAuthorWhereUniqueInputSchema,
}).strict() ;

export const PollOptionFindFirstArgsSchema: z.ZodType<Prisma.PollOptionFindFirstArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  where: PollOptionWhereInputSchema.optional(),
  orderBy: z.union([ PollOptionOrderByWithRelationInputSchema.array(),PollOptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PollOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PollOptionScalarFieldEnumSchema,PollOptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PollOptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PollOptionFindFirstOrThrowArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  where: PollOptionWhereInputSchema.optional(),
  orderBy: z.union([ PollOptionOrderByWithRelationInputSchema.array(),PollOptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PollOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PollOptionScalarFieldEnumSchema,PollOptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PollOptionFindManyArgsSchema: z.ZodType<Prisma.PollOptionFindManyArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  where: PollOptionWhereInputSchema.optional(),
  orderBy: z.union([ PollOptionOrderByWithRelationInputSchema.array(),PollOptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PollOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PollOptionScalarFieldEnumSchema,PollOptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PollOptionAggregateArgsSchema: z.ZodType<Prisma.PollOptionAggregateArgs> = z.object({
  where: PollOptionWhereInputSchema.optional(),
  orderBy: z.union([ PollOptionOrderByWithRelationInputSchema.array(),PollOptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PollOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PollOptionGroupByArgsSchema: z.ZodType<Prisma.PollOptionGroupByArgs> = z.object({
  where: PollOptionWhereInputSchema.optional(),
  orderBy: z.union([ PollOptionOrderByWithAggregationInputSchema.array(),PollOptionOrderByWithAggregationInputSchema ]).optional(),
  by: PollOptionScalarFieldEnumSchema.array(),
  having: PollOptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PollOptionFindUniqueArgsSchema: z.ZodType<Prisma.PollOptionFindUniqueArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  where: PollOptionWhereUniqueInputSchema,
}).strict() ;

export const PollOptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PollOptionFindUniqueOrThrowArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  where: PollOptionWhereUniqueInputSchema,
}).strict() ;

export const AuthorFindFirstArgsSchema: z.ZodType<Prisma.AuthorFindFirstArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthorScalarFieldEnumSchema,AuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuthorFindFirstOrThrowArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthorScalarFieldEnumSchema,AuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthorFindManyArgsSchema: z.ZodType<Prisma.AuthorFindManyArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthorScalarFieldEnumSchema,AuthorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthorAggregateArgsSchema: z.ZodType<Prisma.AuthorAggregateArgs> = z.object({
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithRelationInputSchema.array(),AuthorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthorGroupByArgsSchema: z.ZodType<Prisma.AuthorGroupByArgs> = z.object({
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([ AuthorOrderByWithAggregationInputSchema.array(),AuthorOrderByWithAggregationInputSchema ]).optional(),
  by: AuthorScalarFieldEnumSchema.array(),
  having: AuthorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthorFindUniqueArgsSchema: z.ZodType<Prisma.AuthorFindUniqueArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const AuthorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuthorFindUniqueOrThrowArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaFindFirstArgsSchema: z.ZodType<Prisma.SocialMediaFindFirstArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SocialMediaScalarFieldEnumSchema,SocialMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SocialMediaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SocialMediaFindFirstOrThrowArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SocialMediaScalarFieldEnumSchema,SocialMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SocialMediaFindManyArgsSchema: z.ZodType<Prisma.SocialMediaFindManyArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SocialMediaScalarFieldEnumSchema,SocialMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SocialMediaAggregateArgsSchema: z.ZodType<Prisma.SocialMediaAggregateArgs> = z.object({
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SocialMediaGroupByArgsSchema: z.ZodType<Prisma.SocialMediaGroupByArgs> = z.object({
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithAggregationInputSchema.array(),SocialMediaOrderByWithAggregationInputSchema ]).optional(),
  by: SocialMediaScalarFieldEnumSchema.array(),
  having: SocialMediaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SocialMediaFindUniqueArgsSchema: z.ZodType<Prisma.SocialMediaFindUniqueArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SocialMediaFindUniqueOrThrowArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const ImageFindFirstArgsSchema: z.ZodType<Prisma.ImageFindFirstArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageScalarFieldEnumSchema,ImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ImageFindFirstOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageScalarFieldEnumSchema,ImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ImageFindManyArgsSchema: z.ZodType<Prisma.ImageFindManyArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageScalarFieldEnumSchema,ImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ImageAggregateArgsSchema: z.ZodType<Prisma.ImageAggregateArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ImageGroupByArgsSchema: z.ZodType<Prisma.ImageGroupByArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithAggregationInputSchema.array(),ImageOrderByWithAggregationInputSchema ]).optional(),
  by: ImageScalarFieldEnumSchema.array(),
  having: ImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ImageFindUniqueArgsSchema: z.ZodType<Prisma.ImageFindUniqueArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict() ;

export const ImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ImageFindUniqueOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReadingHistoryCreateArgsSchema: z.ZodType<Prisma.ReadingHistoryCreateArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  data: z.union([ ReadingHistoryCreateInputSchema,ReadingHistoryUncheckedCreateInputSchema ]),
}).strict() ;

export const ReadingHistoryUpsertArgsSchema: z.ZodType<Prisma.ReadingHistoryUpsertArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  where: ReadingHistoryWhereUniqueInputSchema,
  create: z.union([ ReadingHistoryCreateInputSchema,ReadingHistoryUncheckedCreateInputSchema ]),
  update: z.union([ ReadingHistoryUpdateInputSchema,ReadingHistoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReadingHistoryCreateManyArgsSchema: z.ZodType<Prisma.ReadingHistoryCreateManyArgs> = z.object({
  data: z.union([ ReadingHistoryCreateManyInputSchema,ReadingHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReadingHistoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReadingHistoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReadingHistoryCreateManyInputSchema,ReadingHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReadingHistoryDeleteArgsSchema: z.ZodType<Prisma.ReadingHistoryDeleteArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  where: ReadingHistoryWhereUniqueInputSchema,
}).strict() ;

export const ReadingHistoryUpdateArgsSchema: z.ZodType<Prisma.ReadingHistoryUpdateArgs> = z.object({
  select: ReadingHistorySelectSchema.optional(),
  include: ReadingHistoryIncludeSchema.optional(),
  data: z.union([ ReadingHistoryUpdateInputSchema,ReadingHistoryUncheckedUpdateInputSchema ]),
  where: ReadingHistoryWhereUniqueInputSchema,
}).strict() ;

export const ReadingHistoryUpdateManyArgsSchema: z.ZodType<Prisma.ReadingHistoryUpdateManyArgs> = z.object({
  data: z.union([ ReadingHistoryUpdateManyMutationInputSchema,ReadingHistoryUncheckedUpdateManyInputSchema ]),
  where: ReadingHistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReadingHistoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ReadingHistoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ReadingHistoryUpdateManyMutationInputSchema,ReadingHistoryUncheckedUpdateManyInputSchema ]),
  where: ReadingHistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReadingHistoryDeleteManyArgsSchema: z.ZodType<Prisma.ReadingHistoryDeleteManyArgs> = z.object({
  where: ReadingHistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InfoCreateArgsSchema: z.ZodType<Prisma.InfoCreateArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  data: z.union([ InfoCreateInputSchema,InfoUncheckedCreateInputSchema ]),
}).strict() ;

export const InfoUpsertArgsSchema: z.ZodType<Prisma.InfoUpsertArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  where: InfoWhereUniqueInputSchema,
  create: z.union([ InfoCreateInputSchema,InfoUncheckedCreateInputSchema ]),
  update: z.union([ InfoUpdateInputSchema,InfoUncheckedUpdateInputSchema ]),
}).strict() ;

export const InfoCreateManyArgsSchema: z.ZodType<Prisma.InfoCreateManyArgs> = z.object({
  data: z.union([ InfoCreateManyInputSchema,InfoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InfoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InfoCreateManyAndReturnArgs> = z.object({
  data: z.union([ InfoCreateManyInputSchema,InfoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InfoDeleteArgsSchema: z.ZodType<Prisma.InfoDeleteArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  where: InfoWhereUniqueInputSchema,
}).strict() ;

export const InfoUpdateArgsSchema: z.ZodType<Prisma.InfoUpdateArgs> = z.object({
  select: InfoSelectSchema.optional(),
  include: InfoIncludeSchema.optional(),
  data: z.union([ InfoUpdateInputSchema,InfoUncheckedUpdateInputSchema ]),
  where: InfoWhereUniqueInputSchema,
}).strict() ;

export const InfoUpdateManyArgsSchema: z.ZodType<Prisma.InfoUpdateManyArgs> = z.object({
  data: z.union([ InfoUpdateManyMutationInputSchema,InfoUncheckedUpdateManyInputSchema ]),
  where: InfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InfoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InfoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ InfoUpdateManyMutationInputSchema,InfoUncheckedUpdateManyInputSchema ]),
  where: InfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InfoDeleteManyArgsSchema: z.ZodType<Prisma.InfoDeleteManyArgs> = z.object({
  where: InfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VoteCreateArgsSchema: z.ZodType<Prisma.VoteCreateArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  data: z.union([ VoteCreateInputSchema,VoteUncheckedCreateInputSchema ]),
}).strict() ;

export const VoteUpsertArgsSchema: z.ZodType<Prisma.VoteUpsertArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
  create: z.union([ VoteCreateInputSchema,VoteUncheckedCreateInputSchema ]),
  update: z.union([ VoteUpdateInputSchema,VoteUncheckedUpdateInputSchema ]),
}).strict() ;

export const VoteCreateManyArgsSchema: z.ZodType<Prisma.VoteCreateManyArgs> = z.object({
  data: z.union([ VoteCreateManyInputSchema,VoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VoteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VoteCreateManyAndReturnArgs> = z.object({
  data: z.union([ VoteCreateManyInputSchema,VoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VoteDeleteArgsSchema: z.ZodType<Prisma.VoteDeleteArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const VoteUpdateArgsSchema: z.ZodType<Prisma.VoteUpdateArgs> = z.object({
  select: VoteSelectSchema.optional(),
  include: VoteIncludeSchema.optional(),
  data: z.union([ VoteUpdateInputSchema,VoteUncheckedUpdateInputSchema ]),
  where: VoteWhereUniqueInputSchema,
}).strict() ;

export const VoteUpdateManyArgsSchema: z.ZodType<Prisma.VoteUpdateManyArgs> = z.object({
  data: z.union([ VoteUpdateManyMutationInputSchema,VoteUncheckedUpdateManyInputSchema ]),
  where: VoteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VoteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VoteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VoteUpdateManyMutationInputSchema,VoteUncheckedUpdateManyInputSchema ]),
  where: VoteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VoteDeleteManyArgsSchema: z.ZodType<Prisma.VoteDeleteManyArgs> = z.object({
  where: VoteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsItemCreateArgsSchema: z.ZodType<Prisma.NewsItemCreateArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  data: z.union([ NewsItemCreateInputSchema,NewsItemUncheckedCreateInputSchema ]),
}).strict() ;

export const NewsItemUpsertArgsSchema: z.ZodType<Prisma.NewsItemUpsertArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  where: NewsItemWhereUniqueInputSchema,
  create: z.union([ NewsItemCreateInputSchema,NewsItemUncheckedCreateInputSchema ]),
  update: z.union([ NewsItemUpdateInputSchema,NewsItemUncheckedUpdateInputSchema ]),
}).strict() ;

export const NewsItemCreateManyArgsSchema: z.ZodType<Prisma.NewsItemCreateManyArgs> = z.object({
  data: z.union([ NewsItemCreateManyInputSchema,NewsItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NewsItemCreateManyAndReturnArgs> = z.object({
  data: z.union([ NewsItemCreateManyInputSchema,NewsItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsItemDeleteArgsSchema: z.ZodType<Prisma.NewsItemDeleteArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  where: NewsItemWhereUniqueInputSchema,
}).strict() ;

export const NewsItemUpdateArgsSchema: z.ZodType<Prisma.NewsItemUpdateArgs> = z.object({
  select: NewsItemSelectSchema.optional(),
  include: NewsItemIncludeSchema.optional(),
  data: z.union([ NewsItemUpdateInputSchema,NewsItemUncheckedUpdateInputSchema ]),
  where: NewsItemWhereUniqueInputSchema,
}).strict() ;

export const NewsItemUpdateManyArgsSchema: z.ZodType<Prisma.NewsItemUpdateManyArgs> = z.object({
  data: z.union([ NewsItemUpdateManyMutationInputSchema,NewsItemUncheckedUpdateManyInputSchema ]),
  where: NewsItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsItemUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NewsItemUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NewsItemUpdateManyMutationInputSchema,NewsItemUncheckedUpdateManyInputSchema ]),
  where: NewsItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsItemDeleteManyArgsSchema: z.ZodType<Prisma.NewsItemDeleteManyArgs> = z.object({
  where: NewsItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PollCreateArgsSchema: z.ZodType<Prisma.PollCreateArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  data: z.union([ PollCreateInputSchema,PollUncheckedCreateInputSchema ]),
}).strict() ;

export const PollUpsertArgsSchema: z.ZodType<Prisma.PollUpsertArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  where: PollWhereUniqueInputSchema,
  create: z.union([ PollCreateInputSchema,PollUncheckedCreateInputSchema ]),
  update: z.union([ PollUpdateInputSchema,PollUncheckedUpdateInputSchema ]),
}).strict() ;

export const PollCreateManyArgsSchema: z.ZodType<Prisma.PollCreateManyArgs> = z.object({
  data: z.union([ PollCreateManyInputSchema,PollCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PollCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PollCreateManyAndReturnArgs> = z.object({
  data: z.union([ PollCreateManyInputSchema,PollCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PollDeleteArgsSchema: z.ZodType<Prisma.PollDeleteArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  where: PollWhereUniqueInputSchema,
}).strict() ;

export const PollUpdateArgsSchema: z.ZodType<Prisma.PollUpdateArgs> = z.object({
  select: PollSelectSchema.optional(),
  include: PollIncludeSchema.optional(),
  data: z.union([ PollUpdateInputSchema,PollUncheckedUpdateInputSchema ]),
  where: PollWhereUniqueInputSchema,
}).strict() ;

export const PollUpdateManyArgsSchema: z.ZodType<Prisma.PollUpdateManyArgs> = z.object({
  data: z.union([ PollUpdateManyMutationInputSchema,PollUncheckedUpdateManyInputSchema ]),
  where: PollWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PollUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PollUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PollUpdateManyMutationInputSchema,PollUncheckedUpdateManyInputSchema ]),
  where: PollWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PollDeleteManyArgsSchema: z.ZodType<Prisma.PollDeleteManyArgs> = z.object({
  where: PollWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogCreateArgsSchema: z.ZodType<Prisma.BlogCreateArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  data: z.union([ BlogCreateInputSchema,BlogUncheckedCreateInputSchema ]),
}).strict() ;

export const BlogUpsertArgsSchema: z.ZodType<Prisma.BlogUpsertArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
  create: z.union([ BlogCreateInputSchema,BlogUncheckedCreateInputSchema ]),
  update: z.union([ BlogUpdateInputSchema,BlogUncheckedUpdateInputSchema ]),
}).strict() ;

export const BlogCreateManyArgsSchema: z.ZodType<Prisma.BlogCreateManyArgs> = z.object({
  data: z.union([ BlogCreateManyInputSchema,BlogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogCreateManyAndReturnArgs> = z.object({
  data: z.union([ BlogCreateManyInputSchema,BlogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogDeleteArgsSchema: z.ZodType<Prisma.BlogDeleteArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const BlogUpdateArgsSchema: z.ZodType<Prisma.BlogUpdateArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  data: z.union([ BlogUpdateInputSchema,BlogUncheckedUpdateInputSchema ]),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const BlogUpdateManyArgsSchema: z.ZodType<Prisma.BlogUpdateManyArgs> = z.object({
  data: z.union([ BlogUpdateManyMutationInputSchema,BlogUncheckedUpdateManyInputSchema ]),
  where: BlogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BlogUpdateManyMutationInputSchema,BlogUncheckedUpdateManyInputSchema ]),
  where: BlogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogDeleteManyArgsSchema: z.ZodType<Prisma.BlogDeleteManyArgs> = z.object({
  where: BlogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogTagCreateArgsSchema: z.ZodType<Prisma.BlogTagCreateArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  data: z.union([ BlogTagCreateInputSchema,BlogTagUncheckedCreateInputSchema ]),
}).strict() ;

export const BlogTagUpsertArgsSchema: z.ZodType<Prisma.BlogTagUpsertArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  where: BlogTagWhereUniqueInputSchema,
  create: z.union([ BlogTagCreateInputSchema,BlogTagUncheckedCreateInputSchema ]),
  update: z.union([ BlogTagUpdateInputSchema,BlogTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const BlogTagCreateManyArgsSchema: z.ZodType<Prisma.BlogTagCreateManyArgs> = z.object({
  data: z.union([ BlogTagCreateManyInputSchema,BlogTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ BlogTagCreateManyInputSchema,BlogTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogTagDeleteArgsSchema: z.ZodType<Prisma.BlogTagDeleteArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  where: BlogTagWhereUniqueInputSchema,
}).strict() ;

export const BlogTagUpdateArgsSchema: z.ZodType<Prisma.BlogTagUpdateArgs> = z.object({
  select: BlogTagSelectSchema.optional(),
  include: BlogTagIncludeSchema.optional(),
  data: z.union([ BlogTagUpdateInputSchema,BlogTagUncheckedUpdateInputSchema ]),
  where: BlogTagWhereUniqueInputSchema,
}).strict() ;

export const BlogTagUpdateManyArgsSchema: z.ZodType<Prisma.BlogTagUpdateManyArgs> = z.object({
  data: z.union([ BlogTagUpdateManyMutationInputSchema,BlogTagUncheckedUpdateManyInputSchema ]),
  where: BlogTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BlogTagUpdateManyMutationInputSchema,BlogTagUncheckedUpdateManyInputSchema ]),
  where: BlogTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogTagDeleteManyArgsSchema: z.ZodType<Prisma.BlogTagDeleteManyArgs> = z.object({
  where: BlogTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogLikeCreateArgsSchema: z.ZodType<Prisma.BlogLikeCreateArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  data: z.union([ BlogLikeCreateInputSchema,BlogLikeUncheckedCreateInputSchema ]),
}).strict() ;

export const BlogLikeUpsertArgsSchema: z.ZodType<Prisma.BlogLikeUpsertArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  where: BlogLikeWhereUniqueInputSchema,
  create: z.union([ BlogLikeCreateInputSchema,BlogLikeUncheckedCreateInputSchema ]),
  update: z.union([ BlogLikeUpdateInputSchema,BlogLikeUncheckedUpdateInputSchema ]),
}).strict() ;

export const BlogLikeCreateManyArgsSchema: z.ZodType<Prisma.BlogLikeCreateManyArgs> = z.object({
  data: z.union([ BlogLikeCreateManyInputSchema,BlogLikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogLikeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogLikeCreateManyAndReturnArgs> = z.object({
  data: z.union([ BlogLikeCreateManyInputSchema,BlogLikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogLikeDeleteArgsSchema: z.ZodType<Prisma.BlogLikeDeleteArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  where: BlogLikeWhereUniqueInputSchema,
}).strict() ;

export const BlogLikeUpdateArgsSchema: z.ZodType<Prisma.BlogLikeUpdateArgs> = z.object({
  select: BlogLikeSelectSchema.optional(),
  include: BlogLikeIncludeSchema.optional(),
  data: z.union([ BlogLikeUpdateInputSchema,BlogLikeUncheckedUpdateInputSchema ]),
  where: BlogLikeWhereUniqueInputSchema,
}).strict() ;

export const BlogLikeUpdateManyArgsSchema: z.ZodType<Prisma.BlogLikeUpdateManyArgs> = z.object({
  data: z.union([ BlogLikeUpdateManyMutationInputSchema,BlogLikeUncheckedUpdateManyInputSchema ]),
  where: BlogLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogLikeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogLikeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BlogLikeUpdateManyMutationInputSchema,BlogLikeUncheckedUpdateManyInputSchema ]),
  where: BlogLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogLikeDeleteManyArgsSchema: z.ZodType<Prisma.BlogLikeDeleteManyArgs> = z.object({
  where: BlogLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogAuthorCreateArgsSchema: z.ZodType<Prisma.BlogAuthorCreateArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  data: z.union([ BlogAuthorCreateInputSchema,BlogAuthorUncheckedCreateInputSchema ]),
}).strict() ;

export const BlogAuthorUpsertArgsSchema: z.ZodType<Prisma.BlogAuthorUpsertArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  where: BlogAuthorWhereUniqueInputSchema,
  create: z.union([ BlogAuthorCreateInputSchema,BlogAuthorUncheckedCreateInputSchema ]),
  update: z.union([ BlogAuthorUpdateInputSchema,BlogAuthorUncheckedUpdateInputSchema ]),
}).strict() ;

export const BlogAuthorCreateManyArgsSchema: z.ZodType<Prisma.BlogAuthorCreateManyArgs> = z.object({
  data: z.union([ BlogAuthorCreateManyInputSchema,BlogAuthorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogAuthorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogAuthorCreateManyAndReturnArgs> = z.object({
  data: z.union([ BlogAuthorCreateManyInputSchema,BlogAuthorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogAuthorDeleteArgsSchema: z.ZodType<Prisma.BlogAuthorDeleteArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  where: BlogAuthorWhereUniqueInputSchema,
}).strict() ;

export const BlogAuthorUpdateArgsSchema: z.ZodType<Prisma.BlogAuthorUpdateArgs> = z.object({
  select: BlogAuthorSelectSchema.optional(),
  include: BlogAuthorIncludeSchema.optional(),
  data: z.union([ BlogAuthorUpdateInputSchema,BlogAuthorUncheckedUpdateInputSchema ]),
  where: BlogAuthorWhereUniqueInputSchema,
}).strict() ;

export const BlogAuthorUpdateManyArgsSchema: z.ZodType<Prisma.BlogAuthorUpdateManyArgs> = z.object({
  data: z.union([ BlogAuthorUpdateManyMutationInputSchema,BlogAuthorUncheckedUpdateManyInputSchema ]),
  where: BlogAuthorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogAuthorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogAuthorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BlogAuthorUpdateManyMutationInputSchema,BlogAuthorUncheckedUpdateManyInputSchema ]),
  where: BlogAuthorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogAuthorDeleteManyArgsSchema: z.ZodType<Prisma.BlogAuthorDeleteManyArgs> = z.object({
  where: BlogAuthorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PollOptionCreateArgsSchema: z.ZodType<Prisma.PollOptionCreateArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  data: z.union([ PollOptionCreateInputSchema,PollOptionUncheckedCreateInputSchema ]),
}).strict() ;

export const PollOptionUpsertArgsSchema: z.ZodType<Prisma.PollOptionUpsertArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  where: PollOptionWhereUniqueInputSchema,
  create: z.union([ PollOptionCreateInputSchema,PollOptionUncheckedCreateInputSchema ]),
  update: z.union([ PollOptionUpdateInputSchema,PollOptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PollOptionCreateManyArgsSchema: z.ZodType<Prisma.PollOptionCreateManyArgs> = z.object({
  data: z.union([ PollOptionCreateManyInputSchema,PollOptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PollOptionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PollOptionCreateManyAndReturnArgs> = z.object({
  data: z.union([ PollOptionCreateManyInputSchema,PollOptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PollOptionDeleteArgsSchema: z.ZodType<Prisma.PollOptionDeleteArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  where: PollOptionWhereUniqueInputSchema,
}).strict() ;

export const PollOptionUpdateArgsSchema: z.ZodType<Prisma.PollOptionUpdateArgs> = z.object({
  select: PollOptionSelectSchema.optional(),
  include: PollOptionIncludeSchema.optional(),
  data: z.union([ PollOptionUpdateInputSchema,PollOptionUncheckedUpdateInputSchema ]),
  where: PollOptionWhereUniqueInputSchema,
}).strict() ;

export const PollOptionUpdateManyArgsSchema: z.ZodType<Prisma.PollOptionUpdateManyArgs> = z.object({
  data: z.union([ PollOptionUpdateManyMutationInputSchema,PollOptionUncheckedUpdateManyInputSchema ]),
  where: PollOptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PollOptionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PollOptionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PollOptionUpdateManyMutationInputSchema,PollOptionUncheckedUpdateManyInputSchema ]),
  where: PollOptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PollOptionDeleteManyArgsSchema: z.ZodType<Prisma.PollOptionDeleteManyArgs> = z.object({
  where: PollOptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthorCreateArgsSchema: z.ZodType<Prisma.AuthorCreateArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  data: z.union([ AuthorCreateInputSchema,AuthorUncheckedCreateInputSchema ]),
}).strict() ;

export const AuthorUpsertArgsSchema: z.ZodType<Prisma.AuthorUpsertArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
  create: z.union([ AuthorCreateInputSchema,AuthorUncheckedCreateInputSchema ]),
  update: z.union([ AuthorUpdateInputSchema,AuthorUncheckedUpdateInputSchema ]),
}).strict() ;

export const AuthorCreateManyArgsSchema: z.ZodType<Prisma.AuthorCreateManyArgs> = z.object({
  data: z.union([ AuthorCreateManyInputSchema,AuthorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuthorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthorCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuthorCreateManyInputSchema,AuthorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuthorDeleteArgsSchema: z.ZodType<Prisma.AuthorDeleteArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const AuthorUpdateArgsSchema: z.ZodType<Prisma.AuthorUpdateArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  data: z.union([ AuthorUpdateInputSchema,AuthorUncheckedUpdateInputSchema ]),
  where: AuthorWhereUniqueInputSchema,
}).strict() ;

export const AuthorUpdateManyArgsSchema: z.ZodType<Prisma.AuthorUpdateManyArgs> = z.object({
  data: z.union([ AuthorUpdateManyMutationInputSchema,AuthorUncheckedUpdateManyInputSchema ]),
  where: AuthorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AuthorUpdateManyMutationInputSchema,AuthorUncheckedUpdateManyInputSchema ]),
  where: AuthorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthorDeleteManyArgsSchema: z.ZodType<Prisma.AuthorDeleteManyArgs> = z.object({
  where: AuthorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SocialMediaCreateArgsSchema: z.ZodType<Prisma.SocialMediaCreateArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  data: z.union([ SocialMediaCreateInputSchema,SocialMediaUncheckedCreateInputSchema ]),
}).strict() ;

export const SocialMediaUpsertArgsSchema: z.ZodType<Prisma.SocialMediaUpsertArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
  create: z.union([ SocialMediaCreateInputSchema,SocialMediaUncheckedCreateInputSchema ]),
  update: z.union([ SocialMediaUpdateInputSchema,SocialMediaUncheckedUpdateInputSchema ]),
}).strict() ;

export const SocialMediaCreateManyArgsSchema: z.ZodType<Prisma.SocialMediaCreateManyArgs> = z.object({
  data: z.union([ SocialMediaCreateManyInputSchema,SocialMediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SocialMediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SocialMediaCreateManyAndReturnArgs> = z.object({
  data: z.union([ SocialMediaCreateManyInputSchema,SocialMediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SocialMediaDeleteArgsSchema: z.ZodType<Prisma.SocialMediaDeleteArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaUpdateArgsSchema: z.ZodType<Prisma.SocialMediaUpdateArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  data: z.union([ SocialMediaUpdateInputSchema,SocialMediaUncheckedUpdateInputSchema ]),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaUpdateManyArgsSchema: z.ZodType<Prisma.SocialMediaUpdateManyArgs> = z.object({
  data: z.union([ SocialMediaUpdateManyMutationInputSchema,SocialMediaUncheckedUpdateManyInputSchema ]),
  where: SocialMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SocialMediaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SocialMediaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SocialMediaUpdateManyMutationInputSchema,SocialMediaUncheckedUpdateManyInputSchema ]),
  where: SocialMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SocialMediaDeleteManyArgsSchema: z.ZodType<Prisma.SocialMediaDeleteManyArgs> = z.object({
  where: SocialMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ImageCreateArgsSchema: z.ZodType<Prisma.ImageCreateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  data: z.union([ ImageCreateInputSchema,ImageUncheckedCreateInputSchema ]),
}).strict() ;

export const ImageUpsertArgsSchema: z.ZodType<Prisma.ImageUpsertArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
  create: z.union([ ImageCreateInputSchema,ImageUncheckedCreateInputSchema ]),
  update: z.union([ ImageUpdateInputSchema,ImageUncheckedUpdateInputSchema ]),
}).strict() ;

export const ImageCreateManyArgsSchema: z.ZodType<Prisma.ImageCreateManyArgs> = z.object({
  data: z.union([ ImageCreateManyInputSchema,ImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ImageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ImageCreateManyAndReturnArgs> = z.object({
  data: z.union([ ImageCreateManyInputSchema,ImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ImageDeleteArgsSchema: z.ZodType<Prisma.ImageDeleteArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict() ;

export const ImageUpdateArgsSchema: z.ZodType<Prisma.ImageUpdateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  data: z.union([ ImageUpdateInputSchema,ImageUncheckedUpdateInputSchema ]),
  where: ImageWhereUniqueInputSchema,
}).strict() ;

export const ImageUpdateManyArgsSchema: z.ZodType<Prisma.ImageUpdateManyArgs> = z.object({
  data: z.union([ ImageUpdateManyMutationInputSchema,ImageUncheckedUpdateManyInputSchema ]),
  where: ImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ImageUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ImageUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ImageUpdateManyMutationInputSchema,ImageUncheckedUpdateManyInputSchema ]),
  where: ImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ImageDeleteManyArgsSchema: z.ZodType<Prisma.ImageDeleteManyArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;