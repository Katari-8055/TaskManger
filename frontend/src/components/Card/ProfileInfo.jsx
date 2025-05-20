import React from 'react'
import { getIntials } from '../../utils/helper'

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 '>
            {getIntials(userInfo?.name || "Guest")}
        </div>
        <div>
            <p className='text-sm font-medium'>
                {userInfo?.name || "Guest"}
            </p>
            <button className='text-sm underline text-slate-700' onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default ProfileInfo