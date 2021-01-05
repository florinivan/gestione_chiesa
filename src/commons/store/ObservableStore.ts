// NOT USED AT THE MOMENT

// import { Logger } from 'commons/utils/Logger';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { distinctUntilChanged, map } from 'rxjs/operators';

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export class ObservableStore<StateType = any> {
//   private _stateSubject: BehaviorSubject<StateType>;

//   constructor(initialState: StateType) {
//     this._stateSubject = new BehaviorSubject(initialState);
//   }

//   getState(): Observable<StateType> {
//     return this._stateSubject.asObservable().pipe(
//       // distinctUntilChanged((prev, next) => {
//       //   // if (!isEqual(prev, next)) {
//       //   //   Logger.actionPrevAndNextState(this.constructor.name.toString(), prev, next);
//       //   // }
//       //   return isEqual(prev, next);
//       // })
//       distinctUntilChanged()
//     );
//   }

//   // I get the current state snapshot.
//   getStateSnapshot(): StateType {
//     return this._stateSubject.getValue();
//   }

//   setState(nextState: StateType, actionName?: string): void {
//     const currentState = this.getStateSnapshot();

//     // if (!isEqual(currentState, nextState)) {
//     //   Logger.actionPrevAndNextState(
//     //     `${this.constructor.name.toString()} ${actionName}`,
//     //     currentState,
//     //     nextState
//     //   );
//     //   this._stateSubject.next(nextState);
//     // }
//     Logger.action2(`${this.constructor.name.toString()} ${actionName}`, currentState, nextState);
//     this._stateSubject.next(nextState);
//   }

//   select<K extends keyof StateType>(key: K): Observable<StateType[K]> {
//     const selectStream = this._stateSubject.pipe(
//       map((state: StateType) => {
//         return state[key];
//       }),
//       distinctUntilChanged()
//     );

//     return selectStream;
//   }
// }
