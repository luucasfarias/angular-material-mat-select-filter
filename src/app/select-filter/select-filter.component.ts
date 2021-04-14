import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class GenericFilter {
  constructor(
    public id: string,
    public name: string,
    public selected?: boolean
  ) {
    if (selected === undefined) {
      selected = false;
    }
  }
}

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css'],
})
export class SelectFilterComponent implements OnInit {
  itemControl = new FormControl();

  genericsFilter = [
    new GenericFilter('1', 'Magazine luiza'),
    new GenericFilter('2', 'Mercado livre'),
    new GenericFilter('3', 'Amazon'),
  ];

  // TODO: Deixar isso aqui dinâmico vindo de outro componente
  // @Input() genericsFilter: GenericFilter[];

  selectedFilter: GenericFilter[] = new Array<GenericFilter>();
  filteredOptions: Observable<GenericFilter[]>;
  lastFilter = '';

  ngOnInit() {
    this.filteredOptions = this.itemControl.valueChanges.pipe(
      startWith<string | GenericFilter[]>(''),
      map((value) => (typeof value === 'string' ? value : this.lastFilter)),
      map((filter) => this.filter(filter))
    );
  }

  filter(filter: string): GenericFilter[] {
    this.lastFilter = filter;
    if (filter) {
      return this.genericsFilter.filter((option) => {
        return (
          option.id.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
          option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        );
      });
    } else {
      return this.genericsFilter.slice();
    }
  }

  displayFn(value: GenericFilter[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (index === 0) {
          displayValue = item.id + ' ' + item.name;
        } else {
          displayValue += ', ' + item.id + ' ' + item.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, item: GenericFilter) {
    event.stopPropagation();
    this.toggleSelection(item);
  }

  toggleSelection(item: GenericFilter) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedFilter.push(item);
    } else {
      const i = this.selectedFilter.findIndex(
        (value) => value.id === item.id && value.name === item.name
      );
      this.selectedFilter.splice(i, 1);
    }
    // FIXME: Remover
    // this.itemControl.setValue(
    //   this.selectedFilter.map((item) => item.name.substr(0, 3))
    // );
  }
}
