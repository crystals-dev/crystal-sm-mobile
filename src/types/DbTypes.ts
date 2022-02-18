/**
 * Model users
 * 
 */
export type users = {
    id: string
    first_name: string
    last_name: string
    email: string
    password: string
    confirmed: boolean
    verified: boolean
    profile: string
    bio: string
    created_at: Date
    updated_at: Date
}

/**
   * Model auths
   * 
   */
export type auths = {
    id: string
    user_id: string
    code: number
    created_at: Date
    updated_at: Date
}

/**
   * Model invites
   * 
   */
export type invites = {
    id: string
    to_id: string
    from_id: string
    created_at: Date
    updated_at: Date
}

/**
   * Model posts
   * 
   */
export type posts = {
    id: string
    user_id: string
    content: string
    created_at: Date
    updated_at: Date
}

/**
   * Model files
   * 
   */
export type files = {
    id: string
    url: string
    mime: string
    post_id: string
}

/**
   * Model comments
   * 
   */
export type comments = {
    id: string
    user_id: string
    content: string
    file_url: string | null
    post_id: string
    created_at: Date
    updated_at: Date
}

/**
   * Model likes
   * 
   */
export type likes = {
    id: string
    user_id: string
    post_id: string
}

/**
   * Model shares
   * 
   */
export type shares = {
    id: string
    post_id: string
    user_id: string
    content: string
    created_at: Date
    updated_at: Date
}
