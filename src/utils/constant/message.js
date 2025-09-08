const generateMessage = (entity) => ({
  alreadyExist: `${entity} already exist`,
  notFound: `${entity} not found`,
  creadtedSuccessfully: `${entity} created successfully`,
  updatedSuccessfully: `${entity} updated successfully`,
  deletedSuccessfully: `${entity} deleted successfully`,
  failToCreate: `${entity} fail to create`,
  failToDelete: `${entity} fail to delete`,
  failToUpdate: `${entity} fail to update`,
})
export const messages = {
  user: { ...generateMessage('user'), verified: 'user verified successfully', invalidCredentials: 'invalid credentials', notAuthorized: 'not authorized to access this api' },
  product: generateMessage('product'),
  categroy: generateMessage('categroy'),
  subcategroy: generateMessage('subcategroy'),
}