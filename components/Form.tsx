interface Props {
  isMember: boolean;
  handleSubmit: any;
  userInfo: React.MutableRefObject<{
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  }>;
  submitting: boolean;
  toggleMember: any;
}

const Form: React.FC<Props> = ({
  isMember,
  handleSubmit,
  userInfo,
  submitting,
  toggleMember,
}) => {
  return (
    <div className="flex flex-col gap-3 ">
      <h1 className="text-xl font-mono font-bold text-center">
        {isMember
          ? "Siwoo's Membership Login"
          : "Join Siwoo's Membership Today"}
      </h1>
      <div className="flex gap-2 text-md justify-center">
        <div>{isMember ? "Not a member?" : "Already have account?"}</div>
        <button
          onClick={toggleMember}
          className="font-bold underline underline-offset-4"
        >
          {isMember ? "Sign Up" : "Log In"}
        </button>
      </div>
      <form onSubmit={handleSubmit} noValidate className="group">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <input
              required
              type="email"
              placeholder="Email"
              className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              pattern="^[a-z]+[\.]*[a-z0-9]+@[a-z]+\.[a-z]{2,}$"
              onChange={(e) => {
                userInfo.current.email = e.target.value.toLowerCase();
              }}
            />
            <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Please enter a valid email address
            </span>
          </div>
          <div className="flex flex-col">
            <input
              required
              type="password"
              placeholder="Password"
              className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              pattern=".{7,12}"
              onChange={(e) => {
                userInfo.current.password = e.target.value;
              }}
            />
            <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              You password must be between 7 and 12 characters long
            </span>
          </div>

          {!isMember && (
            <div className="flex flex-col">
              <input
                required
                type="text"
                placeholder="First Name"
                className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="^[a-zA-Z]+$"
                onChange={(e) => {
                  userInfo.current.firstName = e.target.value;
                }}
              />
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid name
              </span>
            </div>
          )}
          {!isMember && (
            <div className="flex flex-col">
              <input
                required
                type="text"
                placeholder="Last Name"
                className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="[a-zA-Z]+$"
                onChange={(e) => {
                  userInfo.current.lastName = e.target.value;
                }}
              />
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid name
              </span>
            </div>
          )}
          {!isMember && (
            <div className="flex flex-col">
              <input
                required
                type="text"
                placeholder="Phone"
                className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="[0-9]+$"
                onChange={(e) => {
                  userInfo.current.phone = e.target.value;
                }}
              />
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter valid numbers
              </span>
            </div>
          )}
          {!isMember && (
            <div className="flex flex-col">
              <input
                required
                type="text"
                placeholder="Address"
                className="border-b border-y-neutral-400 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                pattern="^[a-zA-Z0-9, \/\-]*$"
                onChange={(e) => {
                  userInfo.current.address = e.target.value;
                }}
              />
              <span className="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid address
              </span>
            </div>
          )}
          <div className="flex flex-row">
            {isMember ? (
              <button
                className="btn_auth basis-full"
                type="submit"
                disabled={submitting}
              >
                Log In
              </button>
            ) : (
              <div className="flex flex-row basis-full gap-5 items-center">
                <button
                  className="btn_auth basis-1/2"
                  type="submit"
                  disabled={submitting}
                >
                  Sign Up
                </button>
                <div className="basis-1/2 text-right">Forgot Password?</div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
