Rails.application.config.middleware.use OmniAuth::Builder do  
 provider :twitter, 'VBskK3cMfro3rtBCVSOyg', 'EsbabQQ536ebXVVbdJuYD3fFhElZVUVfCJXDAtUF4'
  #provider :google_oauth2, ENV['GOOGLE_KEY'], ENV['GOOGLE_SECRET']
  provider :facebook, '249656908396518', 'ac10a48a9a864b14fec10b4b39b685a1'

provider :identity, :fields => [ :name ,:email ,:password ,:last_name , :zipcode ,:categories],
   :on_failed_registration => lambda { |env|
    IdentitiesController.action(:new).call(env)
  }
end