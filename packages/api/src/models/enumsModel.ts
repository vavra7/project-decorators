import { registerEnumType } from 'type-graphql';
import { GqlLanguage } from '../enums';

registerEnumType(GqlLanguage, {
  name: 'Language',
  description: 'Languages of application'
});
