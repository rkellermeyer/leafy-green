#OmniAuth.config.logger = Rails.logger
Rails.application.config.middleware.use OmniAuth::Builder do  
 provider :twitter, 'VBskK3cMfro3rtBCVSOyg', 'EsbabQQ536ebXVVbdJuYD3fFhElZVUVfCJXDAtUF4'
 provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'], {:client_options => {:ssl => {:ca_path => "/etc/ssl/certs"}}}

 provider :identity, :fields => [ :name ,:email ,:password ,:last_name ,:confirmemail,:username,:month,:day,:year,:gender,:categories],
 :on_failed_registration => lambda { |env| IdentitiesController.action(:new).call(env) }
end
ENV['FACEBOOK_APP_ID'] = '182928181803226'
ENV['FACEBOOK_SECRET'] = '	d4c9a424b32ef7eb0d85f15fc82c46b5'