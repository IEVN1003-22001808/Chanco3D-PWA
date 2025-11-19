import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGallery } from './community-gallery';

describe('CommunityGallery', () => {
  let component: CommunityGallery;
  let fixture: ComponentFixture<CommunityGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
