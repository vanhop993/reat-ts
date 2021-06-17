import AccessResourcesEN from '../access/AccessResourceEN';
import AccessResourcesVI from '../access/AccessResourceVI';
import AuthenticationResourceEN from '../authentication/AuthenticationResourceEN';
import AuthenticationResourceVI from '../authentication/AuthenticationResourceVI';

import CommonResourcesEN from './ResourcesEN';
import CommonResourcesVI from './ResourcesVI';

const ResourcesEN = {
  ...CommonResourcesEN,
  ...AuthenticationResourceEN,
  ...AccessResourcesEN,
};
const ResourcesVI = {
  ...CommonResourcesVI,
  ...AuthenticationResourceVI,
  ...AccessResourcesVI,
};

const Resources = {
  ['en']: ResourcesEN,
  ['vi']: ResourcesVI
};

export default Resources;
