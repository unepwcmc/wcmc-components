module ApplicationHelper
  def site_title
    'Site title'
  end 

  def site_description
    'Site description'
  end

  def url_encode text
    ERB::Util.url_encode(text)
  end

  def encoded_home_url
    url_encode(request.base_url)
  end

  def social_image
    image_url('unep-wcmc-social-image.png')
  end
  
  def social_image_alt
    'Social image alt text'
  end

  def tweet
    'This is my tweet'
  end

  def create_social_facebook_link_unepwcmc
    title = url_encode('Follow ' + site_title + ' on Facebook')
    href = 'https://www.facebook.com/unepwcmc/'

    link_to '', href, title: title, class: 'icon--social icon--social-facebook fa fa-facebook', target: '_blank'
  end

  def create_social_linkedin_link_unepwcmc
    title = url_encode('Follow ' + site_title + ' on LinkedIn')
    href = 'https://www.linkedin.com/company/unep-wcmc'

    link_to '', href, title: title, class: 'icon--social icon--social-linkedin fa fa-linkedin', target: '_blank'
  end

  def create_social_twitter_link_unepwcmc
    title = url_encode('Follow ' + site_title + ' on Twitter')
    href = 'http://twitter.com/unepwcmc'
    
    link_to '', href, title: title, class: 'icon--social icon--social-twitter fa fa-twitter', target: '_blank'
  end

  def create_social_youtube_link_unepwcmc
    title = url_encode('Follow ' + site_title + ' on Youtube')
    href = 'https://www.youtube.com/channel/UCNdvgU-8_cKxqY2v2PEEhqg'

    link_to '', href, title: title, class: 'icon--social icon--social-youtube fa fa-youtube', target: '_blank'
  end

  def create_social_facebook_link
    title = url_encode('Share ' + site_title + ' on Facebook')
    url = encoded_home_url
    href = 'https://facebook.com/sharer/sharer.php?u=' + url

    link_to '', href, title: title, class: 'icon--social icon--social-facebook', target: '_blank'
  end

  def create_social_linkedin_link
    title = url_encode('Share ' + site_title + ' on LinkedIn')
    url = encoded_home_url
    href = 'https://www.linkedin.com/shareArticle?url=' + url

    link_to '', href, title: title, class: 'icon--social icon--social-linkedin', target: '_blank'
  end

  def create_social_twitter_link
    title = url_encode('Share ' + site_title + ' on Twitter')
    text = url_encode(tweet)
    url = encoded_home_url
    href = 'https://twitter.com/intent/tweet/?text=' + text + '&url=' + url
    
    link_to '', href, title: title, class: 'icon--social icon--social-twitter', target: '_blank'
  end

  def create_social_email_link
    title = url_encode('Share ' + site_title + ' via Email')
    url = encoded_home_url
    subject = url_encode(site_title)
    body = site_description + url_encode("\n\n") + url
    href = 'mailto:?subject=' + subject + '&body=' + body

    link_to '', href, title: title, class: 'icon--social icon--social-email', target: '_self'
  end
end
