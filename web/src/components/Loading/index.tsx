import React from 'react';

import { PageLoading, LoaderIcon } from './style';

function Loading() {
  return (
    <PageLoading>
      <LoaderIcon />
      <h2>Conectando, por favor aguarde...</h2>
    </PageLoading>
  )
}

export default Loading;