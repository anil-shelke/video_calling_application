import React from 'react'
import { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, MapPinIcon, LoaderIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';
import toast from 'react-hot-toast';

const OnboardingPage = () => {

  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser.bio || "",
    nativeLanguage: authUser.nativeLanguage || "",
    location: authUser.location || "",
    profilePic: authUser.profilePic || "",
  })

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },

    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile avatar generated")
  }


  return (
    <div className="d-flex align-items-center justify-content-center p-4" style={{ minHeight: '100vh' }}>
      <div className="card shadow w-100" style={{ maxWidth: '800px', backgroundColor: '#1e1e1e', color: 'white' }}>
        <div className="card-body p-4 p-sm-5">
          <h1 className="h3 text-center fw-bold mb-4">Complete Your Profile</h1>

          <form onSubmit={handleSubmit}>
            {/* PROFILE PIC CONTAINER */}
            <div className="d-flex flex-column align-items-center justify-content-center mb-4">
              {/* IMAGE PREVIEW */}
              <div className="rounded-circle bg-secondary overflow-hidden mb-3" style={{ width: '128px', height: '128px' }}>
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <CameraIcon size={48} style={{ opacity: 0.4, color: '#fff' }} />
                  </div>
                )}
              </div>

              {/* Random Avatar Button */}
              <button type="button" onClick={handleRandomAvatar} className="btn btn-info d-flex align-items-center">
                <ShuffleIcon size={16} className="me-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="form-control"
                style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}

                placeholder="Your full name"
              />
            </div>

            {/* Bio */}
            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="form-control text-white"
                style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
                rows={4}
                placeholder="Tell others about yourself and your language learning goals"
              ></textarea>
            </div>

            {/* Languages */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Native Language</label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="form-select"
                  style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Learning Language</label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="form-select"
                  style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="mb-4 position-relative">
              <label className="form-label">Location</label>
              <div className="position-relative">
                <MapPinIcon size={18} className="position-absolute top-50 start-0 translate-middle-y ms-2" style={{ opacity: 0.7 }} />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="form-control ps-5"
                  style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-100 d-flex justify-content-center align-items-center" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon size={20} className="me-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="me-2" style={{ animation: "spin 1s linear infinite" }} />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default OnboardingPage
