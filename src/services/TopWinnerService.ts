import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Nullable } from 'commons/types';
import { rootAPI } from 'shared/api/Api';
import { map } from 'rxjs/internal/operators/map';
import { PresentMember } from 'commons/models/PresentMember';
import Config from 'shared/configuration';
import { poll } from 'shared/utils/poll-rxjs';

export class TopWinnerService {
  private static instance: TopWinnerService;
  readonly topWinners$ = new BehaviorSubject<Nullable<PresentMember[]>>(null);

  static getInstance() {
    if (!TopWinnerService.instance) {
      TopWinnerService.instance = new TopWinnerService();
    }
    return TopWinnerService.instance;
  }
  fetchPresentMember(pollInterval = Config.DEFAULT_INTERVALS.FETCH_TOP_WINNER) {
    return rootAPI.getPresentMember().pipe(
      poll(pollInterval),
      map((data: PresentMember[]) => {
        this.topWinners$.next(data);
      })
    );
  }
}

const topWinnerService = TopWinnerService.getInstance();
export { topWinnerService };
