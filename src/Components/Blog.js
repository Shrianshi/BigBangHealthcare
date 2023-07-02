import React from 'react';
import doctorv1 from '../videos/doctorv1.mp4';
import doctorv2 from '../videos/doctorv2.mp4'
import doctorv3 from '../videos/doctorv3.mp4'
import doctorv4 from '../videos/doctorv4.mp4'
import NavPat from './NavPat';

function Blog() {
  return (
    <div className='video-div bg-secondary container-fluid'>
    <NavPat></NavPat>
      
      <div class="card border rounded-5 m-5 video">
            <div class="row g-0">
              <div class="col-sm-6">
              <video className="container border rounded-5" controls>
              <source src={doctorv1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <h5 class="card-title">Regular checkup.</h5>
                  <p class="card-text">Some glimpses of regular checkup that happened on this Sunday. </p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-5">
                    NEW</span>
                </div>
              </div>
            </div>
    </div>


      <div class="card border rounded-5 m-5 video">
        <div class="row g-0">
          <div class="col-sm-6">
            <video className="container border rounded-5" controls>
              <source src={doctorv2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="col-md-4">
            <div class="card-body">
              <h5 class="card-title">Our Experts</h5>
              <p class="card-text">Our Experts are our pride.</p>
              <p class="card-text"><small class="text-muted">Last updated 2 days ago</small></p>
            </div>
          </div>
        </div>
      </div>
      <div class="card border rounded-5 m-5 video">
        <div class="row g-0">
          <div class="col-sm-6">
            <video className="container border rounded-5" controls>
              <source src={doctorv3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="col-md-4">
            <div class="card-body">
              <h5 class="card-title">Our bed services</h5>
              <p class="card-text">Our bed facility is most popular service among many of the services provided.</p>
              <p class="card-text"><small class="text-muted">Last updated 2 days ago</small></p>
            </div>
          </div>
        </div>
      </div>
      <div class="card border rounded-5 m-5 video">
        <div class="row g-0">
          <div class="col-sm-6">
            <video className="container border rounded-5" controls>
              <source src={doctorv4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="col-md-4">
            <div class="card-body">
              <h5 class="card-title">Complete care</h5>
              <p class="card-text">We take care of you in every phase of life.</p>
              <p class="card-text"><small class="text-muted">Last updated 2 days ago</small></p>
            </div>
          </div>
        </div>
      </div>
     </div>   

  );
}

export default Blog;