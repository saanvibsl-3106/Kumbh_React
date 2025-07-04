import React, { useEffect } from 'react';
import $ from 'jquery';

const ScrollComponent = () => {
  useEffect(() => {
    $("a").on('click', function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        const hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {
          window.location.hash = hash;
        });
      }
    });

    const handleScroll = () => {
      const navbarSection = $('#navbar').offset().top;
      if ($(window).scrollTop() > navbarSection) {
        $('#goTopBtn').fadeIn();
      } else {
        $('#goTopBtn').fadeOut();
      }
    };

    $(window).on('scroll', handleScroll);

    $('#goTopBtn').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 800);
      return false;
    });

    return () => {
      $(window).off('scroll', handleScroll);
      $("a").off('click');
      $('#goTopBtn').off('click');
    };
  }, []);

  return (
    <div>
      <button id="goTopBtn" className="go-top-btn"><i className="fa-solid fa-arrow-up-long"></i><br/>Top</button>
    </div>
  );
};

export default ScrollComponent;
