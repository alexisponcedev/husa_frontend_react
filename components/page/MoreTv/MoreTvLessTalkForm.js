import React from 'react'

// image
import TvFlipped from 'public/assets/images/more-tv/tv-flipped.png'
import CustomInput from 'components/common/Input'

function MoreTVLessTalkForm({ data }) {
	let { structure } = data
	return (
		<section>
			<div className='blue-bg-more-tv '>
				<div className='bg-bubble-dim-effect'>
					<div className='container px-md-8 py-20'>
						<div className='row align-items-center'>
							<div className='col-12 col-md-6 pe-lg-10'>
								<h4 className='fs-3qx fw-normal text-white mb-10 mb-md-20'>
									{structure?.whiteTitle?.value}
									<span className='d-block opacity-75'>
										{structure?.title?.value}
									</span>
								</h4>
								<p className='fs-2 text-white fw-normal mb-7'>
									{structure?.paragraph?.value}
								</p>
								<img
									src={structure?.image?.src}
									alt={structure?.image?.alt}
									width='80%'
									className='d-none d-md-block'
								/>
							</div>
							<div className='col-12 col-md-6 ps-lg-10'>
								<form action=''>
									<p className='fw-normal text-white mb-11'>
										{structure?.formText?.value}
									</p>
									<p className='fw-normal text-white mb-2'>Select answer</p>
									<div className='d-flex justify-content-start align-items-center flex-wrap mb-8'>
										<div className='custom-radio my-2'>
											<input
												type='radio'
												id='8'
												name='proportion'
												className='d-none'
											/>
											<label
												htmlFor='8'
												className='fw-normal text-white mb-0 ms-1'>
												8/10
											</label>
										</div>
										<div className='custom-radio my-2'>
											<input
												type='radio'
												id='6'
												name='proportion'
												className='d-none'
											/>
											<label
												htmlFor='6'
												className='fw-normal text-white mb-0 ms-1'>
												6/10
											</label>
										</div>
										<div className='custom-radio my-2'>
											<input
												type='radio'
												id='1'
												name='proportion'
												className='d-none'
											/>
											<label
												htmlFor='1'
												className='fw-normal text-white mb-0 ms-1'>
												1/10
											</label>
										</div>
									</div>
									<div className='form-group'>
										<CustomInput
											placeholder={'First Name'}
											className='form-control custom-input'
										/>
									</div>
									<div className='form-group'>
										<CustomInput
											placeholder={'Last Name'}
											className='form-control custom-input'
										/>
									</div>
									<div className='form-group'>
										<CustomInput
											placeholder={'Email'}
											className='form-control custom-input'
										/>
									</div>
									<div className='form-group'>
										<CustomInput
											placeholder={'Phone Number'}
											className='form-control custom-input'
										/>
									</div>
									<div className='d-flex justify-content-start align-items-center mb-10'>
										<div className='custom-checkbox'>
											<input
												type='checkbox'
												id='checkbox'
												name='privacy-policy'
												className='d-none'
											/>
											<label
												htmlFor='checkbox'
												className='fw-normal text-white mb-0 ms-1 text-nowrap'>
												I agree to the
												<a href='#' className='text-white ms-2'>
													terms & conditions
												</a>
											</label>
										</div>
									</div>
									<div className='text-end'>
										<button
											type='submit'
											className='btn btn-info-light text-navy text-uppercase rounded-5 px-4'>
											submit
										</button>
									</div>
								</form>
							</div>
							<div className='col-12 d-block d-md-none'>
								<img src={TvFlipped.src} alt='featured image' width='100%' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MoreTVLessTalkForm
