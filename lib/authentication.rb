module Authentication

  class Unauthorized < StandardError; end

  def self.included(base)
    base.send(:include, Authentication::HelperMethods)
    base.send(:include, Authentication::ControllerMethods)
  end

  module HelperMethods
    def current_identity
    	@current_identity ||= Facebook.find(session[:current_identity])
        rescue ActiveRecord::RecordNotFound
        nil
    end

    def authenticated?
      !current_identity.blank?
    end

  end

  module ControllerMethods

    def require_authentication
      authenticate Facebook.find_by_id(session[:current_identity])
      rescue Unauthorized => e
      redirect_to root_url and return false
    end

    def authenticate(user)
      raise Unauthorized unless user
      session[:current_identity] = user.id
    end

    def unauthenticate
      current_identity.destroy
      @current_identity = session[:current_identity] = nil
    end
  end
end