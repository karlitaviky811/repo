import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-prim',
  templateUrl: './prim.component.html',
  styleUrls: ['./prim.component.css']
})

export class PrimComponent implements OnInit {
  heroes$ = new BehaviorSubject<{[name: string]: any}>({
    'Hammerer Maccabeus': {
      name: 'Hammerer Maccabeus',
      types: 'Holy/Fire',
      attack: 286,
      defense: 255,
      speed: 230,
      healing: 103,
      recovery: 154,
      health: 766
    },
    'Ethereal Moodmorph': {
      name: 'Ethereal Moodmorph',
      types: 'Water/Fire',
      attack: 206,
      defense: 203,
      speed: 254,
      healing: 102,
      recovery: 178,
      health: 1115
    }
  });
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  displayedColumns$ = new BehaviorSubject<string[]>([
    'name',
    'types',
    'attack',
    'defense',
    'speed',
    'healing',
    'recovery',
    'levelUp'
  ]);
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(5);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('name');
  sortDirection$ = new BehaviorSubject<string>('asc');

  constructor() { }

  ngOnInit() {
    this.heroes$.subscribe(changedHeroData => {
      const superlatives = {
        'highest-attack': null,
        'lowest-attack': null,
        'highest-defense': null,
        'lowest-defense': null,
        'highest-speed': null,
        'lowest-speed': null,
        'highest-healing': null,
        'lowest-healing': null,
        'highest-recovery': null,
        'lowest-recovery': null,
        'highest-health': null,
        'lowest-health': null
      };

      Object.values(changedHeroData).forEach(hero => {
        Object.keys(hero).forEach(key => {
          if (key === 'name' || key === 'types') { return; }

          const highest = `highest-${key}`;
          if (!superlatives[highest] || hero[key] > changedHeroData[superlatives[highest]][key]) {
            superlatives[highest] = hero.name;
            console.log(hero.name);
          }

          const lowest = `lowest-${key}`;
          if (!superlatives[lowest] || hero[key] < changedHeroData[superlatives[lowest]][key]) {
            superlatives[lowest] = hero.name;
          }
        });
      });

      this.superlatives$.next(superlatives);
    });

    combineLatest(this.tableDataSource$, this.currentPage$, this.pageSize$)
    .subscribe(([allSources, currentPage, pageSize]) => {
      const startingIndex = (currentPage - 1) * pageSize;
      const onPage = allSources.slice(startingIndex, startingIndex + pageSize);
      this.dataOnPage$.next(onPage);
    });

    this.heroes$.pipe(take(1)).subscribe(heroData => {
      this.tableDataSource$.next(Object.values(heroData));
    });

    combineLatest(this.heroes$, this.searchFormControl.valueChanges, this.sortKey$, this.sortDirection$)
    .subscribe(([changedHeroData, searchTerm, sortKey, sortDirection]) => {
      const heroesArray = Object.values(changedHeroData);
      let filteredHeroes: any[];

      if (!searchTerm) {
        filteredHeroes = heroesArray;
      } else {
        const filteredResults = heroesArray.filter(hero => {
          return Object.values(hero)
            .reduce((prev, curr) => {
              return prev || curr.toString().toLowerCase().includes(searchTerm.toLowerCase());
            }, false);
        });
        filteredHeroes = filteredResults;
      }

      const sortedHeroes = filteredHeroes.sort((a, b) => {
        if(a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        if(a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        return 0;
      });

      this.tableDataSource$.next(sortedHeroes);
    });

    this.searchFormControl.setValue('');
  }

  adjustSort(key: string) {
    console.log(this.sortKey$.value );
    if (this.sortKey$.value === key) {
      if (this.sortDirection$.value === 'asc') {
        this.sortDirection$.next('desc');
      } else {
        this.sortDirection$.next('asc');
      }
      return;
    }

    this.sortKey$.next(key);
    this.sortDirection$.next('asc');
  }

}
