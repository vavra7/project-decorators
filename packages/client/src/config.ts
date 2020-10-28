import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const gqlPublicUrl = publicRuntimeConfig.gqlPublicUrl;
