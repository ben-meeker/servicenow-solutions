# No images on public pages

### System Property 

### Creator: [@ben-meeker](https://github.com/ben-meeker)

When making public service portal pages, sometimes images or attachments, such as quick link icon images, will not display for unauthenticated users. This cannot be fixed by creating ACL's allowing access alone. There is a system property to change that will fix this.

## Getting Started

* Change the property `glide.image_provider.security_enabled` to `false` instead of `true`