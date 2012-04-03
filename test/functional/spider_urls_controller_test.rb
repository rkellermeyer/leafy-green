require 'test_helper'

class SpiderUrlsControllerTest < ActionController::TestCase
  setup do
    @spider_url = spider_urls(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:spider_urls)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create spider_url" do
    assert_difference('SpiderUrl.count') do
      post :create, spider_url: @spider_url.attributes
    end

    assert_redirected_to spider_url_path(assigns(:spider_url))
  end

  test "should show spider_url" do
    get :show, id: @spider_url
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @spider_url
    assert_response :success
  end

  test "should update spider_url" do
    put :update, id: @spider_url, spider_url: @spider_url.attributes
    assert_redirected_to spider_url_path(assigns(:spider_url))
  end

  test "should destroy spider_url" do
    assert_difference('SpiderUrl.count', -1) do
      delete :destroy, id: @spider_url
    end

    assert_redirected_to spider_urls_path
  end
end
