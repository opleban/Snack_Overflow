module DatesHelper
  def format_time(time_string)
    time_string.to_time.strftime('%b %e, %Y at %l:%M %p')
  end
end