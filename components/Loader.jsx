import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='loader'>
      <Image src="/images/assets/loader.svg" alt="Loader" width={100} height={100} className='loading' />
    </div>
  )
}

export default Loader