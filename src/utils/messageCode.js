const Msg = {
  // USER
  FNAME_REQUIRED: "First name is required!",
  LNAME_REQUIRED: "Last name is required!",
  GENDER_REQUIRED: "Gender is required!",
  IMAGE_REQUIRED: "Image is required!",
  BIO_REQUIRED: "Bio is required!",
  LOCATION_REQUIRED: "Location is required!",
  EMAIL_REQUIRED: "Email is required!",
  EMAIL_INVALID: "Enter a valid email!",
  MOBILE_INVALID: "Enter a valid mobile number!",
  USER_REGISTERED: "User registered successfully",
  USER_EMAIL_EXIST: "User already exist with this email, try another one",
  USER_MOBILE_EXIST: "User already exist with this mobile No., try another one",
  MOBILE_REQUIRED: "Mobile number required",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_LENGTH: "Password must be of six character in length ",
  LOGGED_IN: "Successfully logged in ",
  INVALID_CREDENTIALS: "Your credentials are invalid",
  PASSWD_NOT_HASHED: "Password is not hashed",
  PASSWD_NOT_MATCHED: "Password not matched",
  USER_DELETE: "User has been deleted successfully",
  USER_NOT_FOUND: "User doesn't exist with this credentials",
  USER_NOT_EXIST: "User doesn't exist",
  ADMIN_NOT_EXIST: "Admin doesn't exist",
  USER_NOT_UPDATE: "Oop's there is a problem while updating user",
  USER_NOT_DELETED: "Oop's there is a problem while deleting user",
  ENTER_DETAIL: "Enter the credentials to log in",
  IMAGE_REQUIRED: "Image is required",
  INCORRECT_PASSWORD: "Password is invalid",
  USER_LOGIN_PANEL: "Admin cannot login to user panel",
  ADMIN_LOGIN_PANEL: "User cannot login to admin panel",

  // CATEGORY
  CATEGORY_EXIST: "Category with the same name exist, try another one",
  CATEGORY_CREATED: "Category created successfully",
  CATEGORY_NAME_REQUIRED: "Name of the category is required",
  CATEGORY_ID_REQUIRED: "Category id is required",
  CATEGORY_CREATOR_REQUIRED: "Name of the creator of category is required",
  CATEGORY_DESCRIPTION_REQUIRED: "Description required",
  CATEGORY_NOT_FOUND: "Category not found",
  CATEGORY_NOT_DELETE: "Oop's there is a problem while deleting category",
  CATEGORY_NOT_UPDATE: "Oop's there is a problem while updating category",
  CATEGORY_UPDATED: "Category updated successfully",
  CATEGORY_DELETED: "Category deleted successfully",
  CATEGORY_BAD_CHANGE: "Category name cannot be changed once created",

  // SUBCATEGORY
  SUBCATEGORY_EXIST: "Sub Category with the same name exist, try another one",
  SUBCATEGORY_CREATED: "Sub Category created successfully",
  SUBCATEGORY_NAME_REQUIRED: "Name of the subcategory is required",
  SUBCATEGORY_ID_REQUIRED: "Subcategory id is required",
  SUBCATEGORY_CREATOR_REQUIRED:
    "Name of the creator of subcategory is required",
  SUBCATEGORY_DESCRIPTION_REQUIRED: "Content required",
  SUBCATEGORY_NOT_FOUND: "Sub Category not found",
  SUBCATEGORY_NOT_DELETE: "Oop's there is a problem while deleting subcategory",
  SUBCATEGORY_NOT_UPDATE: "Oop's there is a problem while updating subcategory",
  SUBCATEGORY_UPDATED: "Sub Category updated successfully",
  SUBCATEGORY_DELETED: "Sub Category deleted successfully",
  SUBCATEGORY_BAD_CHANGE:
    "Sub Category name, category cannot be changed once created",

  // POST
  POST_EXIST: "Post with the same name exist, try another one",
  POST_CREATED: "Post created successfully",
  POST_NAME_REQUIRED: "Name of the post is required",
  POST_ID_REQUIRED: "Post id is required",
  POST_CREATOR_REQUIRED: "Name of the creator of post is required",
  POST_CONTENT_REQUIRED: "Content required",
  POST_NOT_FOUND: "Post not found",
  POST_NOT_DELETE: "Oop's there is a problem while deleting post",
  POST_NOT_UPDATE: "Oop's there is a problem while updating post",
  POST_UPDATED: "Post updated successfully",
  POST_DELETED: "Post deleted successfully",
  POST_BAD_CHANGE:
    "Post category or sub category cannot be changed once created",

  // COMMENT
  COMMENT_CREATED: "Comment created successfully",
  COMMENT_CREATOR_REQUIRED: "Name of creator of comment is required",
  COMMENT_CONTENT_REQUIRED: "Content required",
  COMMENT_NOT_FOUND: "Comment not found",
  COMMENT_NOT_DELETE: "Oop's there is a problem while deleting comment",
  COMMENT_NOT_UPDATE: "Oop's there is a problem while updating comment",
  COMMENT_UPDATED: "Comment updated successfully",
  COMMENT_DELETED: "Comment deleted successfully",
  COMMENT_BAD_CHANGE:
    "Comment category, sub category or post Id cannot be changed once created",

  // MESSAGE
  MESSAGE_NOT_FOUND: "Message not found",
  MESSAGE_DELETED: "Message deleted successfully",
  MESSAGE_CREATED: "Message sent successfully",
  MESSAGE_CONTENT_REQUIRED: "Message content required",
  MESSAGE_SENDER_REQUIRED: "Message sender required",
  MESSAGE_RECEIVER_REQUIRED: "Message receiver required",

  // FOLLOW
  USER_REQUIRED: "User required",
  FOLLOWING_REQUIRED: "Following id required",
  FOLLOWER_REQUIRED: "Follower id required",
  UNFOLLOW: "Unfollow",
  FOLLOW: "Follow",
  CANT_FOLLOW: "Cannot follow yourself",

  // ERROR
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_ID: "Enter a valid Id",
  MAIL_ERROR: "Error in sending password update mail",
  NO_USER_ACCESS: "User cannot access this functionality",

  // SUCCESS
  SUCCESS: "Success",
  PASSWORD_UPDATED: "Password updated",

  // TOKEN
  TOKEN_REQUIRED: "Token is required",
  TOKEN_USER_NOT_FOUND: "User of this token not found",
  TOKEN_EXPIRED: "Token has been expired",
  INVALID_TOKEN: "Invalid token",
  UNAUTHORIZED_ACCESS: "Unauthorized access",

  // IMAGE
  IMAGE_REQUIRED: "Image is required",
  INVALID_IMAGE: "Image must be in jpeg, jpg, or png type",

  // FORGET PASSWORD
  INVALID_OTP: "Invalid OTP",
  OTP_SENT: "Otp send successfully",
  OTP_REQUIRED: "Otp required",
  NO_USER_EMAIL: "No user exist with this email",

  // EXTRAS
  ID_REQUIRED: "Id required",
};

module.exports = { Msg };
