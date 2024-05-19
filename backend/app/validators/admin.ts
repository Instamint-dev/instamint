import vine from '@vinejs/vine'

export const loginAdminValidator = vine.compile(
    vine.object({
      username: vine.string().trim().alphaNumeric(),
      password: vine.string().minLength(8),
    })
  );