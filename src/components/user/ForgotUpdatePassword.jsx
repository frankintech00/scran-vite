import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function ForgotUpdatePassword() {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { sendPasswordReset, error, setError } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <div className="w-full max-w-md p-6 rounded-lg shadow-2xl lg:max-w-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-primary">
          Need a new password?
        </h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <span className="mb-12 text-base">
              Enter the email address you registerd with and we'll send you a
              link to reset your password.
            </span>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className="shadow-md btn btn-block btn-primary"
              onClick={async () => {
                const result = await sendPasswordReset(email);
                if (result) {
                  setError(null);
                  setIsDialogOpen(true);
                  console.log(isDialogOpen);
                }
              }}
            >
              Reset Password
            </button>
          </div>
          {isDialogOpen && (
            <dialog id="my_modal_1" className="modal" open>
              <div method="dialog" className="shadow-lg modal-box">
                <h1 className="mb-6 text-3xl font-semibold text-center text-primary">
                  Password Reset Email Sent
                </h1>
                <p className="py-4 text-center">
                  Please check your inbox for the password reset email.
                </p>
                <div className="modal-action">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/login")}
                  >
                    Sign in with New Password
                  </button>
                </div>
              </div>
            </dialog>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotUpdatePassword;
