import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TagMetadataService } from 'src/app/services/tag-metadata/tag-metadata.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @ViewChild('tagName') tagName: ElementRef;

  @Input() colorOverride: string;
  @Input() editable: boolean;
  @Input() text: string;

  @Output() doRemove = new EventEmitter<boolean>();

  color$ = new BehaviorSubject<string>('');

  showTooltip = false;
  tooltipText: string;
  tooltipTitle: string;
  tagIcon: string;

  constructor(private tagMetadataService: TagMetadataService) {}

  ngOnInit(): void {
    this.color$.next(this.colorOverride || this.tagMetadataService.determineTagColor(this.text));
    this.tooltipText = this.tagMetadataService.determineTagTooltip(this.text);
    this.tooltipTitle = this.tagMetadataService.determineTagTitle(this.text);
    this.tagIcon = this.tagMetadataService.determineTagIcon(this.text);
  }

  clickRemoveTag(): void {
    if (this.editable) {
      this.doRemove.emit(true);
    }
  }

  showTag(show: boolean): void {
    if (!this.editable) {
      this.showTooltip = show;
    }
  }
}
