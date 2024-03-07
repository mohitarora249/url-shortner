"use client";
import GoogleLogin from '~/components/google-login'

const ActionBar = () => {
  return (
    <div className="flex justify-center mt-8 space-x-8">
      {/* <Button variant="outline" className="">Explore Features</Button> */}
      <GoogleLogin />
    </div>
  )
}

export default ActionBar;