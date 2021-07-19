import {  Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PostEvent } from 'src/app/models/post-event';
import { ConfigService } from '../../config/config.service';
import { TechEvent } from '../../models/config';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements  OnInit {
  displayedColumns: string[] = ['id', 'websiteName', 'eventName', 'eventStartDate', 'eventEndDate', 'location'];
  dataSource: MatTableDataSource<TechEvent>;
  urls = ["https://www.techmeme.com/events", "https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html"];
  postUrls : PostEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private configService: ConfigService) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }


  showConfig() {
    this.configService.getConfig()
      .subscribe((data: TechEvent[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      });

  }

  /**
   * refeshes the 
   */
  refreshData() {
      this.configService.refreshData(this.postUrls)
      .subscribe((data: TechEvent[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      });

  }

  ngOnInit() {
      this.postUrls = new PostEvent(this.urls);
      console.log(this.postUrls);
      this.showConfig();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
//   };

// }
