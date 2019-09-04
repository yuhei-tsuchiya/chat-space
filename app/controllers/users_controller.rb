class UsersController < ApplicationController


  def edit

  end

  def update
    if current_user.update(user_params) #受け取った値があればアップデートして、redirect_to root_path
      redirect_to root_path
    else
      render :edit  #もう一度editアクションへ
    end
  end

end

private

  def user_params
    params.require(:user).permit(:name, :email)  #edit画面で入力された名前とメールアドレス
  end
end